import RepositoryInterface, { InvoiceModel } from "@invoice/domain/repository.interface";
import { IUseCase } from "rich-domain/types";

export class ListInvoicesUseCase implements IUseCase<void, InvoiceModel[]> {
	constructor(private readonly repo: RepositoryInterface) { }
	
	async execute(): Promise<InvoiceModel[]> {
		return this.repo.list();
	}
}

export default ListInvoicesUseCase;
