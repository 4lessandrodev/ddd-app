import supertest from 'supertest';

describe('app.test', () => {
	const url = '/products';
	const host = '127.0.0.1:3000';
	let id = '';

	it('should create a product with success', async () => {
		const result = await supertest(host).post(url).send({ name: 'valid', price: 21 });
		expect(result.status).toBe(200);
	});

	it('should get product with success', async () => {
		const result = await supertest(host).get(url);
		expect(result.status).toBe(200);

		id = result.body.products[0].id;

		expect(result.body.products[0].name).toBe('valid');
		expect(result.body.products[0].price).toBe(21);
	});

	it('should update first product', async () => {
		const result = await supertest(host).put(`${url}/${id}`).send({ name: 'changed', price: 42 });
		expect(result.status).toBe(200);
	});

	it('should get first product updated', async () => {
		const result = await supertest(host).get(url);
		expect(result.status).toBe(200);
		expect(result.body.products[0].name).toBe('changed');
		expect(result.body.products[0].price).toBe(42);
	});
});
