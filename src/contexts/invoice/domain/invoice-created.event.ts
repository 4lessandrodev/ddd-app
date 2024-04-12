import { EventHandler } from "rich-domain";
import Invoice from "./invoice.aggregate";

export class InvoiceCreatedEvent extends EventHandler<Invoice>{

	constructor() { 
		super({ eventName: 'InvoiceCreated' });
	}
	
	dispatch(aggregate: Invoice): void {
		const model = aggregate.toObject();
		console.log(`EVENT DISPATCH: GENERATE INVOICE`);
		console.log(model);
	}
}

export default InvoiceCreatedEvent;
