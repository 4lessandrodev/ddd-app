import RepositoryInterface from "@invoice/domain/repository.interface";

export const productRepositoryMock: RepositoryInterface = {
	create: jest.fn(),
	list: jest.fn()
}

export default productRepositoryMock;
