import ProductToInvoiceAdapter from "../product-to-invoice.adapter";
import { InvoiceModel } from "../repository.interface";

describe('adapter', () => {

	const adapter = new ProductToInvoiceAdapter();
	const date = new Date('2022-01-01 01:00:00')
	
	const data: InvoiceModel = {
		id: 'valid_id',
		itemName: { value: 'valid_name' },
		amount: { value: 200 },
		createdAt: date,
		updatedAt: date,
	};

	
	it('should create a domain from a model', () => {
		const product = adapter.adaptOne(data);
		expect(product.toObject()).toEqual(data);
	});

	it('should fails if provide an invalid value', () => {
		const build = () => adapter.adaptOne({ ...data, amount: { value: -10 } });
		expect(build).toThrow();
	});
});
