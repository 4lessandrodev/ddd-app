import ListProductsUseCase from "../list-products.use-case";
import productRepositoryMock from "./product-repository.mock";

describe('list-product.use-case', () => {

	const useCase = new ListProductsUseCase(productRepositoryMock);

	it('should get products with success', async () => {

		jest.spyOn(productRepositoryMock, 'list').mockResolvedValueOnce([]);
		
		const result = await useCase.execute();
		expect(result).toEqual([]);
	});

});
