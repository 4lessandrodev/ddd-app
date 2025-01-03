import { Class, Adapter, Id, ValueObject } from "rich-domain";
import ItemName, { NameProps } from "./item-name.value-object";
import Amount, { PriceProps } from "./amount.value-object";
import Invoice from "./invoice.aggregate";
import { InvoiceModel } from "./repository.interface";

export class ProductToInvoiceAdapter implements Adapter<InvoiceModel, Invoice>{
	adaptOne(target: InvoiceModel): Invoice {
		const { result, data } = ValueObject.createMany([
			Class<NameProps>(ItemName, { value: target.itemName.value }),
			Class<PriceProps>(Amount, { value: target.amount.value })
		]);

		if (result.isFail()) throw new Error(result.error());
		
		const itemName = data.next().value() as ItemName;
		const amount = data.next().value() as Amount;

		const id = Id(target.id);
		const { createdAt, updatedAt } = target;

		return Invoice.create({ id, itemName, amount, createdAt, updatedAt }).value();
	}
}

export default ProductToInvoiceAdapter;
