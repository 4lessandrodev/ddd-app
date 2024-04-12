import { Aggregate, Ok, Result, UID } from "types-ddd";
import ProductName from "./product-name.value-object";
import ProductPrice from "./product-price.value-object";
import ProductCreatedEvent from "./product-created.event";

export interface ProductProps {
	id?: UID;
	name: ProductName;
	price: ProductPrice;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Product extends Aggregate<ProductProps> {
	private constructor(props: ProductProps) {
		super(props);
	}

	update(name: ProductName, price: ProductPrice): Product {
		this.set('name').to(name);
		this.set('price').to(price);
		this.addEvent('productChanged', () => {
			console.log(`EVENT DISPATCH: CHANGE PRICE AND NAME`);
		});
		return this;
	}

	public static create(props: ProductProps): Result<Product> {
		const product = new Product(props);
		if (product.isNew()) product.addEvent(new ProductCreatedEvent());
		return Ok(product);
	}
}

export default Product;
