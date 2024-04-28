import Invoice from "./invoice.aggregate";

export class InvoiceModel {
	id!: string;
	itemName!: { value: string };
	amount!: { value: number };
	createdAt!: Date;
	updatedAt!: Date;
}

export interface InvoiceRepositoryInterface {
	create(invoice: Invoice): Promise<void>;
	list(): Promise<InvoiceModel[]>;
}

export default InvoiceRepositoryInterface;
