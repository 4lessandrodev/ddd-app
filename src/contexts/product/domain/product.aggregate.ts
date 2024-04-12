import { Aggregate, Ok, Result, UID } from "rich-domain";
import ProductName from "./product-name.value-object";
import ProductPrice from "./product-price.value-object";

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
		return Ok(new Product(props));
	}
}

export default Product;
