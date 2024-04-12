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

	it('should do not change price value if setters is disabled', () => {
		const price = ProductPrice.create({ value: 100 }).value();
		expect(price.get("value")).toBe(100);
		price.set('value').to(21);
		expect(price.get("value")).toBe(100);
	});

	it('should return fails if provide an invalid price', () => {
		const invalidName = '';
		const result = ProductPrice.create({ value: invalidName as any });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must be positive');
	});

	it('should do not change the value if provide an invalid value', () => {
		const price = ProductPrice.create({ value: 42 }).value();
		const invalidValue = -11;
		expect(price.get('value')).toBe(42);
		price.change('value', invalidValue);
		expect(price.get('value')).toBe(42);
	});
});
