const request = require('supertest');
const app = require("../servers/Index");
const jwt = require('jsonwebtoken');
const { postOrder, getOrder } = require('../controllers/OrderController');
const db = require('../models/Index');

require("dotenv").config();
jest.mock('../models/Index');

describe('Endpoint orders', () => {
	it('should error respond because need token to access this endpoint', async () => {
		try {
			const response = await request(app)
				.get('/orders')
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
				.get('/orders')
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

	it('should oke when post new order using mock order', async () => {
		const mockProduct =
			[
				{
					id: "f7ecd206-8c58-4354-a39b-7163f6088994", name: "barang 1", price: 100000,
				},
				{
					id: "46850628-af16-4fd3-8839-8c1a0560dc44", name: "barang 2", price: 50000,
				},

			];
		const mockOrder = {
			products: [
				{
					uuid: 'f7ecd206-8c58-4354-a39b-7163f6088994',
					total: 1,
				},
				{
					uuid: '46850628-af16-4fd3-8839-8c1a0560dc44',
					total: 1,
				},
			],
		};


		const res = {
			send: jest.fn(),
			status: jest.fn(() => res),
		};

		try {
			// Mock the db module methods
			db.Order.create.mockResolvedValue(mockOrder);
			db.Product.findOne.mockImplementation(async (where) => {
				const product = mockProduct.find(p => p.id === where.where.id);
				return product ? { ...product, order_id: null, update: jest.fn() } : null;
			});


			await postOrder(mockOrder, res);

			expect(db.Order.create).toHaveBeenCalled();
			expect(db.Order.create.mock.results[0].value.update).toHaveBeenCalledWith({ total: 2 });

			// Check that the Products were found and updated correctly
			expect(db.Product.findOne).toHaveBeenCalledTimes(2);
			expect(db.Product.findOne.mock.results[0].value.update).toHaveBeenCalledWith({ order_id: 1 });
			expect(db.Product.findOne.mock.results[1].value.update).toHaveBeenCalledWith({ order_id: 1 });

			// Test that the status and json methods were called with the right arguments
			expect(res.status).toBe(200);
			expect(res.json).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String),
			});
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should oke when post new order using mock order', async () => {
		const mockDataOrder = [
			{
				id: 1,
				total: 2,
				products: [
					{ id: "f7ecd206-8c58-4354-a39b-7163f6088994", name: "product 1", price: 100 },
					{ id: "46850628-af16-4fd3-8839-8c1a0560dc44", name: "product 2", price: 50 },
				]
			},
		];

		const res = {
			json: jest.fn(),
			status: jest.fn(() => res),
		};

		try {
			// Mock the db module methods
			db.Order.findAll.mockResolvedValue(mockDataOrder);

			await getOrder(mockDataOrder, res);

			expect(db.Order.findAll).toHaveBeenCalled();
			expect(res.status).toBe(200);
			expect(res.json).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String),
				results: expect.objectContaining({
					orders: expect.arrayContaining([
						expect.objectContaining({
							uuid: expect.any(String),
							products: expect.arrayContaining({
								name: expect.any(String),
								quantity: expect.any(Number),
								price: expect.any(Number)
							})
						})
					])
				})
			});
		} catch (error) {
			expect(error).toBe(error);
		}
	});
});
