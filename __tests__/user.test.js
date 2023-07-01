const request = require('supertest');
const app = require("../servers/Index");
const jwt = require('jsonwebtoken');
require("dotenv").config();

describe('POST /login', () => {
	it('should respond with a JWT on successful login', async () => {
		const email = "susilo.j8@gmail.com";
		const password = "1234567890";

		try {
			const response = await request(app)
				.post('/login')
				.set("Accept", "application/json")
				.send({ email: email, password: password })
				.expect(200);

			expect(response.status).toBe(200);

			expect(response.body).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String),
				results: expect.objectContaining({
					token: expect.any(String),
				}),
			});

			expect(response.body.status).toBe('success');
			expect(response.body.code).toBe(200);
			expect(response.body.message).toBe('message from backend');

			const decoded = jwt.verify(response.body.results.token, process.env.TOKEN_KEY);

			expect(decoded).toHaveProperty('userId');
			expect(decoded).toHaveProperty('iat');
			expect(decoded).toHaveProperty('exp');
			expect(decoded).toHaveProperty('message');
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should error because invalid email or password', async () => {
		const email = "susilo.j10@gmail.com";
		const password = "1234567890";

		try {
			const response = await request(app)
				.post('/login')
				.set("Accept", "application/json")
				.send({ email: email, password: password })
				.expect(401);

			expect(response.status).toBe(401);

			expect(response.body).toMatchObject({
				message: expect.any(String)
			});
		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should error because result compare password with bcrypt is not valid', async () => {
		const email = "susilo.j10@gmail.com";
		const password = "1234567890";

		try {
			const response = await request(app)
				.post('/login')
				.set("Accept", "application/json")
				.send({ email: email, password: password })
				.expect(401);

			expect(response.status).toBe(401);

			expect(response.body).toMatchObject({
				message: expect.any(String)
			});
		} catch (error) {
			expect(error).toBe(error);
		}
	});
});
