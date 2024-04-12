import Invoice from "@invoice/domain/invoice.aggregate";
import RepositoryInterface from "@invoice/domain/repository.interface";
import InvoiceModel from "./invoice.model";

export class InvoiceRepository implements RepositoryInterface{
	constructor(
		private readonly db: Array<InvoiceModel>
	) { }

	async create(invoice: Invoice): Promise<void> {
		this.db.push(invoice.toObject());
		invoice.dispatchEvent('InvoiceCreated');
	}

	async list(): Promise<InvoiceModel[]> {
		return this.db;
	}
}

export default InvoiceRepository;
