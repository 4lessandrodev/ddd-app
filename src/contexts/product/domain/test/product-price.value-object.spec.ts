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


	it('should return fails if provide an invalid price', () => {
		const invalidName = '';
		const result = ProductPrice.create({ value: invalidName as any });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must be positive');
	});
});
