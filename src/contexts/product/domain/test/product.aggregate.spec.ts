import { ID } from "rich-domain";
import ProductCreatedEvent from "../product-created.event";
import ProductName from "../product-name.value-object";
import ProductPrice from "../product-price.value-object";
import Product from "../product.aggregate";

describe('product.aggregate', () => {

	const name = ProductName.create({ value: 'valid name' }).value();
	const price = ProductPrice.create({ value: 42 }).value();

	it('should create a valid product with success', () => {
		const result = Product.create({ name, price });
		expect(result.isOk()).toBeTruthy();
	});

	it('should get object from product', () => {
		const result = Product.create({ name, price });
		const product = result.value();
		const obj = product.toObject();
		expect(Object.keys(obj)).toEqual(['id', 'createdAt', 'updatedAt', 'name', 'price']);
		expect(obj.name).toBe('valid name');
		expect(obj.price).toBe(42);
		expect(obj.id).toBeDefined();
		expect(obj.createdAt).toBeDefined();
		expect(obj.updatedAt).toBeDefined();
	});

	it('should change name with success', () => {
		const product = Product.create({ name, price }).value();
		const newName = ProductName.create({ value: 'new name' }).value();

		const dateUpdate1 = product.get('updatedAt');

		expect(product.get('name').get('value')).toBe('valid name');

		product.change('name', newName);
		expect(product.get('name').get('value')).toBe('new name');

		const dateUpdate2 = product.get('updatedAt');
		expect(dateUpdate1).not.toBe(dateUpdate2);
	});

	it('should change price with success', () => {
		const product = Product.create({ name, price }).value();
		const newPrice = ProductPrice.create({ value: 200 }).value();

		expect(product.get('price').get('value')).toBe(42);

		product.change('price', newPrice);
		expect(product.get('price').get('value')).toBe(200);

		const newPrice2 = ProductPrice.create({ value: 121 }).value();
		product.set('price').to(newPrice2);

		expect(product.get('price').get('value')).toBe(121);
	});

	it('should create a product with provided id', () => {
		const id = ID.create();

		const product = Product.create({ name, id, price }).value();

		expect(product.id.value()).toBe(id.value());
	});

	it('should add event to product with success', () => {

		const product = Product.create({ name, price }).value();
		expect(product.eventsMetrics.total).toBe(1);
		expect(product.eventsMetrics.dispatch).toBe(0);

		product.addEvent(new ProductCreatedEvent());

		expect(product.eventsMetrics.total).toBe(1);

		product.dispatchEvent('ProductCreated');
		expect(product.eventsMetrics.dispatch).toBe(1);
		expect(product.eventsMetrics.total).toBe(1);
	});

	it('should update name and price with success', () => {
		const product = Product.create({ name, price }).value();
		const newName = ProductName.create({ value: 'new name' }).value();
		const newPrice = ProductPrice.create({ value: 200 }).value();
		product.update(newName, newPrice);
		const model = product.toObject();
		expect(product.eventsMetrics.total).toBe(2);
		expect(model).toEqual(
			{
				"createdAt": expect.any(Date),
				"id": expect.any(String),
				"name": "new name",
				"price": 200,
				"updatedAt": expect.any(Date),
			}
		);
	});
});
