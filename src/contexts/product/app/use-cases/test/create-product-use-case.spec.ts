import ProductCreatedEvent from "@product/domain/product-created.event";
import CreateProductUseCase, { CreateProductDto } from "../create-product.use-case";
import productRepositoryMock from "./product-repository.mock";

describe('create-product.use-case', () => {

	const event = new ProductCreatedEvent();
	const useCase = new CreateProductUseCase(productRepositoryMock);

	it('should return fails if provide an invalid name value', async () => {

		const saveSpy = jest.spyOn(productRepositoryMock, 'create');

		const invalidNameValue = '';
		const dto: CreateProductDto = { name: invalidNameValue, price: 180.20 };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should return fails if provide an invalid price value', async () => {

		const saveSpy = jest.spyOn(productRepositoryMock, 'create');

		const invalidPriceValue = -10;
		const dto: CreateProductDto = { name: 'valid value', price: invalidPriceValue };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should create a product with success', async () => {

		const saveSpy = jest.spyOn(productRepositoryMock, 'create');

		const dto: CreateProductDto = { name: 'valid name', price: 180.20 };
		
		const result = await useCase.execute(dto);
		
		expect(result.isOk()).toBeTruthy();
		expect(saveSpy).toHaveBeenCalled();
	});

});
