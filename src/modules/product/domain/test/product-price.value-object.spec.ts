import ProductPrice from "../product-price.value-object";

describe('product-price', () => {

	const result = ProductPrice.create({ value: 10 });
	const productPrice = result.value();

	it('should create a valid product price', () => {
		expect(result.isOk()).toBeTruthy();
	});

	it('should get value with success', () => {
		expect(productPrice.get("value")).toBe(10);
	});

	it('should change product price with success', () => {
		productPrice.change('value', 42);
		expect(productPrice.get("value")).toBe(42);
	});

	it('should set a new description with success', () => {
		productPrice.set('value').to(21);
		expect(productPrice.get("value")).toBe(21);
	});

	it('should return fails if provide an invalid price', () => {
		const invalidName = '';
		const result = ProductPrice.create({ value: invalidName as any });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must be positive');
	});

	it('should do not change the value if provide an invalid value', () => {
		const invalidValue = -11;
		expect(productPrice.get('value')).toBe(21);
		productPrice.change('value', invalidValue);
		expect(productPrice.get('value')).toBe(21);
	});
});
