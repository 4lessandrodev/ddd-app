import { DomainEvents, ID } from "types-ddd";
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

	it('should create a product with provided id', () => {
		const id = ID.create();

		const product = Product.create({ name, id, price }).value();

		expect(product.id.value()).toBe(id.value());
	});

	it('should add event to product with success', () => {
		
		expect(DomainEvents.events.total()).toBe(0);
		
		const product = Product.create({ name, price }).value();
		product.addEvent(new ProductCreatedEvent());

		expect(DomainEvents.events.total()).toBe(1);

		DomainEvents.dispatch({ id: product.id, eventName: 'ProductCreated' });

		expect(DomainEvents.events.total()).toBe(0);
	});
});
