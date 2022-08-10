import ProductCreatedEvent from "@product/domain/product-created.event";
import CreateProductUseCase, { CreateProductDto } from "../create-product.use-case";
import productRepositoryMock from "./product-repository.mock";

describe('create-product.use-case', () => {

	const event = new ProductCreatedEvent();
	const useCase = new CreateProductUseCase(productRepositoryMock, event);

	it('should return fails if provide an invalid name value', async () => {

		const saveSpy = jest.spyOn(productRepositoryMock, 'create');

		const invalidNameValue = '';
		const dto: CreateProductDto = { nameValue: invalidNameValue, priceValue: 180.20 };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should return fails if provide an invalid price value', async () => {

		const saveSpy = jest.spyOn(productRepositoryMock, 'create');

		const invalidPriceValue = -10;
		const dto: CreateProductDto = { nameValue: 'valid value', priceValue: invalidPriceValue };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should return fails if repository throws', async () => {

		jest.spyOn(productRepositoryMock, 'create')
			.mockImplementationOnce(async () => {
			throw new Error("something went wrong");
		});
		
		const dto: CreateProductDto = { nameValue: 'valid value', priceValue: 10 };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(result.error()).toBe('something went wrong');
	});

	it('should create a product with success', async () => {

		const saveSpy = jest.spyOn(productRepositoryMock, 'create');

		const dto: CreateProductDto = { nameValue: 'valid name', priceValue: 180.20 };
		
		const result = await useCase.execute(dto);
		
		expect(result.isOk()).toBeTruthy();
		expect(saveSpy).toHaveBeenCalled();
	});

});
