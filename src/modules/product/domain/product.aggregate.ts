import { Aggregate, IResult, Result, UID } from "types-ddd";
import ProductName from "./product-name.value-object";
import ProductPrice from "./product-price.value-object";

export interface ProductProps {
	id?: UID;
	name: ProductName;
	price: ProductPrice;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Product extends Aggregate<ProductProps>{
	private constructor(props: ProductProps) {
		super(props);
	}

	public static create(props: ProductProps): IResult<Product> {
		return Result.Ok(new Product(props));
	}
}

export default Product;
