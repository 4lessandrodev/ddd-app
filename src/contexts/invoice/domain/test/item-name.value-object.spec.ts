import ItemName from "../item-name.value-object";

describe('item-name', () => {

	const result = ItemName.create({ value: 'some valid description' });
	const itemName = result.value();

	it('should create a valid item name', () => {
		expect(result.isOk()).toBeTruthy();
	});

	it('should get value with success', () => {
		expect(itemName.get("value")).toBe('some valid description');
	});

	it('should change item name with success', () => {
		itemName.change('value', 'new name');
		expect(itemName.get("value")).toBe('new name');
	});

	it('should set a new description with success', () => {
		itemName.set('value').to('set new name');
		expect(itemName.get("value")).toBe('set new name');
	});

	it('should return fails if provide an invalid name', () => {
		const invalidName = '';
		const result = ItemName.create({ value: invalidName });
		expect(result.isFail()).toBeTruthy();
		expect(result.value()).toBeNull();
		expect(result.error()).toBe('value must have length min 3 and max 30 char');
	});

	it('should do not change the value if provide an invalid value', () => {
		const invalidValue = 'this is a long description to invalid value error';
		expect(itemName.get('value')).toBe('set new name');
		itemName.change('value', invalidValue);
		expect(itemName.get('value')).toBe('set new name');
	});
});
