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

	it('should do not change amount value if setters is disabled', () => {
		const amount = Amount.create({ value: 100 }).value();
		expect(amount.get("value")).toBe(100);
		amount.set('value').to(21);
		expect(amount.get("value")).toBe(100);
	});

	it('should return fails if provide an invalid amount', () => {
		const invalidAmount = '';
		const result = Amount.create({ value: invalidAmount as any });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must be positive');
	});

	it('should do not change the value if provide an invalid value', () => {
		const amount = Amount.create({ value: 42 }).value();
		const invalidValue = -11;
		expect(amount.get('value')).toBe(42);
		amount.change('value', invalidValue);
		expect(amount.get('value')).toBe(42);
	});
});
