import CreateInvoiceUseCase, { CreateInvoiceDto } from "../create-invoice.use-case";
import invoiceRepositoryMock from "./invoice-repository.mock";

describe('create-invoice.use-case', () => {

	const useCase = new CreateInvoiceUseCase(invoiceRepositoryMock);

	it('should return fails if provide an invalid name value', async () => {

		const saveSpy = jest.spyOn(invoiceRepositoryMock, 'create');

		const invalidNameValue = '';
		const dto: CreateInvoiceDto = { itemName: invalidNameValue, amount: 180.20 };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should return fails if provide an invalid price value', async () => {

		const saveSpy = jest.spyOn(invoiceRepositoryMock, 'create');

		const invalidPriceValue = -10;
		const dto: CreateInvoiceDto = { itemName: 'valid value', amount: invalidPriceValue };
		
		const result = await useCase.execute(dto);
		expect(result.isFail()).toBeTruthy();
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should create a product with success', async () => {

		const saveSpy = jest.spyOn(invoiceRepositoryMock, 'create');

		const dto: CreateInvoiceDto = { itemName: 'valid name', amount: 180.20 };
		
		const result = await useCase.execute(dto);
		
		expect(result.isOk()).toBeTruthy();
		expect(saveSpy).toHaveBeenCalled();
	});

});
