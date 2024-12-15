import { Aggregate, Ok, Result, UID } from "rich-domain";
import ItemName from "./item-name.value-object";
import Amount from "./amount.value-object";
import InvoiceCreatedEvent from "./invoice-created.event";

export interface InvoiceProps {
	id?: UID;
	itemName: ItemName;
	amount: Amount;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Invoice extends Aggregate<InvoiceProps>{
	private constructor(props: InvoiceProps) {
		super(props);
	}

	public static create(props: InvoiceProps): Result<Invoice> {
		const invoice = new Invoice(props);
		invoice.addEvent(new InvoiceCreatedEvent());
		return Ok(invoice);
	}
}

export default Invoice;
