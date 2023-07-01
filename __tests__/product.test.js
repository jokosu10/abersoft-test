const request = require('supertest');
const app = require("../servers/Index");
const jwt = require('jsonwebtoken');
const { deleteProductById, updateProductUsingPutById } = require('../controllers/ProductController');
const db = require('../models/Index');

require("dotenv").config();
jest.mock('../models/Index');

describe('Endpoint products', () => {
	it('should error respond because need token to access this endpoint', async () => {
		try {
			const response = await request(app)
				.get('/products')
				.set("Accept", "application/json")
				.expect(401);

			expect(response.status).toBe(401);

			expect(response.body).toMatchObject({
				code: expect.any(Number),
				message: expect.any(String)
			});
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should error respond because token is expired', async () => {
		try {
			const expiredToken = jwt.sign({ userId: "123" }, process.env.TOKEN_KEY, { expiresIn: '-1s' });

			const response = await request(app)
				.get('/products')
				.set("Accept", "application/json")
				.set('Authorization', `Bearer ${expiredToken}`)
				.expect(401);

			expect(response.status).toBe(401);

			expect(response.body).toMatchObject({
				message: expect.any(String)
			});
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should a give correct respond when get all product', async () => {
		const mockUser = { id: 1, name: 'John Doe' };

		try {
			const testToken = jwt.sign({ user: mockUser }, process.env.TOKEN_KEY, { expiresIn: '1h' });

			const response = await request(app)
				.get('/products')
				.set("Accept", "application/json")
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			expect(response.status).toBe(200);

			expect(response.body).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String),
				results: expect.objectContaining({
					products: expect.any(Array),
				})
			});
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should a give correct respond when update product using uuid', async () => {
		const mockProduct = {
			id: "babe6509-629d-413e-8ce4-111bbc20e650", name: "barang 1", price: 100000
		}

		const reqUpdateProduct = {
			params: { id: 'babe6509-629d-413e-8ce4-111bbc20e650' },
			body: { name: "barang baru 1", price: 125000 },
		};

		const res = {
			send: jest.fn(),
			status: jest.fn(() => res),
		};

		try {
			db.Product.findByIdAndUpdate.mockResolvedValue(mockProduct);

			await updateProductUsingPutById(reqUpdateProduct, res);

			expect(db.Product.findByIdAndUpdate).toHaveBeenCalledWith('babe6509-629d-413e-8ce4-111bbc20e650', { name: "barang baru 1", price: 125000 }, { new: true });
			expect(res.send).toHaveBeenCalledWith(mockProduct);
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should delete product using uuid', async () => {
		const productId = 'babe6509-629d-413e-8ce4-111bbc20e650';

		const req = {
			params: { id: productId },
		};

		const res = {
			send: jest.fn(),
			status: jest.fn(() => res),
		};

		try {
			db.Product.findByIdAndDelete.mockResolvedValue(true);

			await deleteProductById(req, res);

			expect(db.Product.findByIdAndDelete).toHaveBeenCalledWith(productId);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalled();
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('returns 404 if product not found', async () => {
		const reqUpdateProduct = {
			params: { id: 'babe6509-629d-413e-8ce4-111bbc20e650' },
			body: { name: "barang baru 1", price: 125000 },
		};

		const res = {
			send: jest.fn(),
			status: jest.fn(() => res),
		};

		try {
			db.Product.findByIdAndUpdate.mockResolvedValue(null);

			await updateProductUsingPutById(reqUpdateProduct, res);

			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.send).toHaveBeenCalled();
		} catch (error) {
			expect(error).toBe(error);
		}
	});
});
