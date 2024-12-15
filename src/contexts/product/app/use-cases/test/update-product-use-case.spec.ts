import ProductToDomainAdapter from "@product/domain/product-to-domain.adapter";
import { ProductModel } from "@product/domain/repository.interface";
import UpdateProductUseCase, { UpdateProductDto } from "../update-product.use-case"
import productRepositoryMock from "./product-repository.mock"

describe('update-product.use-case', () => {

	const useCase = new UpdateProductUseCase(productRepositoryMock);

	it('should return fail if product does not exists', async () => {

		jest.spyOn(productRepositoryMock, 'getProductById').mockResolvedValueOnce(null);

		const result = await useCase.execute({ id: 'invalid', name: 'valid', price: 10 });
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('Product not found');
	});

	it('should return fails if provide an invalid price value', async () => {
		jest.spyOn(productRepositoryMock, 'getProductById').mockResolvedValueOnce({ id: 'valid' } as any);
		const saveSpy = jest.spyOn(productRepositoryMock, 'create');

		const invalidPriceValue = -10;
		const dto: UpdateProductDto = { id: 'valid', name: 'valid value', price: invalidPriceValue };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should return fails if provide an invalid name value', async () => {

		const saveSpy = jest.spyOn(productRepositoryMock, 'update');

		const invalidNameValue = '';
		const dto: UpdateProductDto = { id: 'valid', name: invalidNameValue, price: 180.20 };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should update a product with success', async () => {
		const adapter = new ProductToDomainAdapter();
		const date = new Date('2022-01-01 01:00:00')
		
		const data: ProductModel = {
			id: 'valid_id',
			name: { value: 'valid_name'},
			price: { value: 200 },
			createdAt: date,
			updatedAt: date,
		};

		const product = adapter.adaptOne(data);

		jest.spyOn(productRepositoryMock, 'getProductById').mockResolvedValueOnce(product);
		const updateSpy = jest.spyOn(productRepositoryMock, 'update');

		expect(product.get('name').get('value')).toBe('valid_name');
		expect(product.get('price').get('value')).toBe(200);

		await useCase.execute({ ...data, name: 'changed', price: 21 });

		expect(product.get('name').get('value')).toBe('changed');
		expect(product.get('price').get('value')).toBe(21);

		expect(updateSpy).toHaveBeenLastCalledWith(product);
	});
})
