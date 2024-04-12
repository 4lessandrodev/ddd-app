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
		productName.change('value', 'new name');
		expect(productName.get("value")).toBe('new name');
	});

	it('should set a new description with success', () => {
		productName.set('value').to('set new name');
		expect(productName.get("value")).toBe('set new name');
	});

	it('should return fails if provide an invalid name', () => {
		const invalidName = '';
		const result = ProductName.create({ value: invalidName });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must have length min 3 and max 30 char');
	});

	it('should do not change the value if provide an invalid value', () => {
		const invalidValue = 'this is a long description to invalid value error';
		expect(productName.get('value')).toBe('set new name');
		productName.change('value', invalidValue);
		expect(productName.get('value')).toBe('set new name');
	});
});
