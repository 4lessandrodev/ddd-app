import { InvoiceModel as Model } from '@invoice/domain/repository.interface';

export class InvoiceModel implements Model {
	id!: string;
	itemName!: { value: string };
	amount!: { value: number };
	createdAt!: Date;
	updatedAt!: Date;
}

export default InvoiceModel;
