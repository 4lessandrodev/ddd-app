import ListInvoicesUseCase from '@invoice/app/use-cases/list-invoices.use-case';
import InvoiceModel from './invoice.model';
import InvoiceRepository from './repository';
import CreateInvoiceUseCase from '@invoice/app/use-cases/create-invoice.use-case';
import { Context } from 'rich-domain';
import generateInvoice from './generate-invoice.service';

const context = Context.events();

export const database: Array<InvoiceModel> = [];
const repository = new InvoiceRepository(database);
export const listInvoicesUseCase = new ListInvoicesUseCase(repository);
const createInvoiceUseCase = new CreateInvoiceUseCase(repository);

// subscribe to product created context
context.subscribe('Invoice:GenerateInvoice', (args) => {
    const [dto] = args.detail;
    createInvoiceUseCase.execute(dto);
});

// infra subscribe to domain
context.subscribe('Invoice:PrintInvoice', (args) => {
    const [model] = args.detail;
    console.log(generateInvoice(model.itemName.value, model.amount.value));
});
