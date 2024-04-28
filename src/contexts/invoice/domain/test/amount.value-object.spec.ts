import Amount from "../amount.value-object";

describe('amount', () => {

	const result = Amount.create({ value: 10 });
	const amount = result.value();

	it('should create a valid amount amount', () => {
		expect(result.isOk()).toBeTruthy();
	});

	it('should get value with success', () => {
		expect(amount.get("value")).toBe(10);
	});

	it('should return fails if provide an invalid amount', () => {
		const invalidAmount = '';
		const result = Amount.create({ value: invalidAmount as any });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must be positive');
	});
});
