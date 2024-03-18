import { EventHandler } from "types-ddd";
import Product from "./product.aggregate";

export class ProductCreatedEvent extends EventHandler<Product>{

	constructor() { 
		super({ eventName: 'ProductCreated' });
	}
	
	dispatch(aggregate: Product): void {
		const model = aggregate.toObject();
		console.log(`EVENT DISPATCH: ${aggregate.hashCode().value()}`);
		console.log(model);
	}
}

export default ProductCreatedEvent;
