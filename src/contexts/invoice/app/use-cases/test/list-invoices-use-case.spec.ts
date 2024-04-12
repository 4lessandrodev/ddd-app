import ListInvoicesUseCase from "../list-invoices.use-case";
import invoiceRepositoryMock from "./invoice-repository.mock";

describe('list-invoices.use-case', () => {

	const useCase = new ListInvoicesUseCase(invoiceRepositoryMock);

	it('should get invoices with success', async () => {

		jest.spyOn(invoiceRepositoryMock, 'list').mockResolvedValueOnce([]);
		
		const result = await useCase.execute();
		expect(result).toEqual([]);
	});

});
