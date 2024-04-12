import ListInvoicesUseCase from '@invoice/app/use-cases/list-invoices.use-case';
import InvoiceModel from './invoice.model';
import InvoiceRepository from './repository';
import CreateInvoiceUseCase from '@invoice/app/use-cases/create-invoice.use-case';
import { Context } from 'rich-domain';

const context = Context.events();

export const database: Array<InvoiceModel> = [];
const repository = new InvoiceRepository(database);
export const listInvoicesUseCase = new ListInvoicesUseCase(repository);
const createInvoiceUseCase = new CreateInvoiceUseCase(repository);

// subscribe to product created context
context.subscribe('GenerateInvoice', (args) => {
    const dto = args.detail[0];
    createInvoiceUseCase.execute(dto);
});
