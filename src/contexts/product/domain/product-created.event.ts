import { EventHandler } from "rich-domain";
import Product from "./product.aggregate";

export class ProductCreatedEvent extends EventHandler<Product>{

	constructor() { 
		super({ eventName: 'ProductCreated' });
	}
	
	dispatch(aggregate: Product): void {
		const model = aggregate.toObject();
		const amount = model.price;
		const itemName = model.name;
		console.log(`EVENT DISPATCH: PRODUCT CREATED`);
		console.log(model);
		// dispatch event to invoice context
		aggregate.context().dispatchEvent('GenerateInvoice', { itemName, amount });
	}
}

export default ProductCreatedEvent;
