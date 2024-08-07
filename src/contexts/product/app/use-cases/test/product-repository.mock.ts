import ProductRepositoryInterface from "@product/domain/repository.interface";

export const productRepositoryMock: ProductRepositoryInterface = {
	create: jest.fn(),
	getProductById: jest.fn(),
	list: jest.fn(),
	update: jest.fn(),
}

export default productRepositoryMock;
