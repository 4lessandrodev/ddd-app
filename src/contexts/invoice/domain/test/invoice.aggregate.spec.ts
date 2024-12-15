import { ID } from "rich-domain";
import InvoiceCreatedEvent from "../invoice-created.event";
import ItemName from "../item-name.value-object";
import Amount from "../amount.value-object";
import Invoice from "../invoice.aggregate";

describe('invoice.aggregate', () => {

	const itemName = ItemName.create({ value: 'valid name' }).value() as ItemName;
	const amount = Amount.create({ value: 42 }).value() as Amount;

	it('should add event to invoice with success', () => {
		
		const invoice = Invoice.create({ itemName, amount }).value();
		expect(invoice.eventsMetrics.total).toBe(1);
		expect(invoice.eventsMetrics.dispatch).toBe(0);

		expect(invoice.eventsMetrics.total).toBe(1);

		invoice.dispatchEvent('InvoiceCreated');
		expect(invoice.eventsMetrics.dispatch).toBe(1);
		expect(invoice.eventsMetrics.total).toBe(1);
	});

	it('should create a valid invoice with success', () => {
		const result = Invoice.create({ itemName, amount });
		expect(result.isOk()).toBeTruthy();
	});

	it('should get object from invoice', () => {
		const result = Invoice.create({ itemName, amount });
		const invoice = result.value();
		const obj = invoice.toObject();
		expect(Object.keys(obj)).toEqual(['id', 'createdAt', 'updatedAt', 'itemName', 'amount']);
		expect(obj.itemName.value).toBe('valid name');
		expect(obj.amount.value).toBe(42);
		expect(obj.id).toBeDefined();
		expect(obj.createdAt).toBeDefined();
		expect(obj.updatedAt).toBeDefined();
	});

	it('should change name with success', () => {
		const invoice = Invoice.create({ itemName, amount }).value();
		const newName = ItemName.create({ value: 'new name' }).value() as ItemName;

		const dateUpdate1 = invoice.get('updatedAt');

		expect(invoice.get('itemName').get('value')).toBe('valid name');

		invoice.change('itemName', newName);
		expect(invoice.get('itemName').get('value')).toBe('new name');

		const dateUpdate2 = invoice.get('updatedAt');
		expect(dateUpdate1).not.toBe(dateUpdate2);
	});

	it('should change amount with success', () => {
		const invoice = Invoice.create({ itemName, amount }).value();
		const newAmount = Amount.create({ value: 200 }).value() as Amount;

		expect(invoice.get('amount').get('value')).toBe(42);

		invoice.change('amount', newAmount);
		expect(invoice.get('amount').get('value')).toBe(200);

		const newAmount2 = Amount.create({ value: 121 }).value() as Amount;
		invoice.set('amount').to(newAmount2);

		expect(invoice.get('amount').get('value')).toBe(121);
	});

	it('should create a invoice with provided id', () => {
		const id = ID.create();

		const invoice = Invoice.create({ itemName, id, amount }).value();

		expect(invoice.id.value()).toBe(id.value());
	});
});
