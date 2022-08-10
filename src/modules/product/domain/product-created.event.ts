import { IDomainEvent } from "rich-domain/types";
import { IHandle } from "types-ddd";
import Product from "./product.aggregate";

export class ProductCreatedEvent implements IHandle<Product>{
	public eventName: string;

	constructor() { 
		this.eventName = 'ProductCreated';
	}
	
	dispatch(event: IDomainEvent<Product>): void {
		console.log(`EVENT DISPATCH: ${event.aggregate.hashCode().value()}`);
	}
}

export default ProductCreatedEvent;
