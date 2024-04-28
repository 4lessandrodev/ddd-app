import ProductName from "../product-name.value-object";

describe('product-name', () => {

	const result = ProductName.create({ value: 'some valid description' });
	const productName = result.value();

	it('should create a valid product name', () => {
		expect(result.isOk()).toBeTruthy();
	});

	it('should get value with success', () => {
		expect(productName.get("value")).toBe('some valid description');
	});

	it('should change product name with success', () => {
		const newName = productName.clone({ value: 'new name' });
		expect(newName.get("value")).toBe('new name');
	});

	it('should return fails if provide an invalid name', () => {
		const invalidName = '';
		const result = ProductName.create({ value: invalidName });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must have length min 3 and max 30 char');
	});
});
