import ProductToDomainAdapter from "../product-to-domain.adapter";
import { ProductModel } from "../repository.interface";

describe('adapter', () => {

	const adapter = new ProductToDomainAdapter();
	const date = new Date('2022-01-01 01:00:00')

	const data: ProductModel = {
		id: 'valid_id',
		name: { value: 'valid_name' },
		price: { value: 200 },
		createdAt: date,
		updatedAt: date,
	};

	it('should create a domain from a model', () => {
		const build = adapter.build(data);
		const product = build.value();
		expect(build.isOk()).toBeTruthy();
		expect(product.toObject()).toEqual(data);
	});

	it('should fails if provide an invalid value', () => {
		const build = adapter.build({ ...data, price: { value: -10 } });
		expect(build.isFail()).toBeTruthy();
	});
});
