import GetProductsUseCase from "../get-products.use-case";
import productRepositoryMock from "./product-repository.mock";

describe('create-product.use-case', () => {

	const useCase = new GetProductsUseCase(productRepositoryMock);

	it('should get products with success', async () => {

		jest.spyOn(productRepositoryMock, 'getProducts').mockResolvedValueOnce([]);
		
		const result = await useCase.execute();
		expect(result).toEqual([]);
	});

});
