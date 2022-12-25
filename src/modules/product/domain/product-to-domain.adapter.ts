import { Class, IAdapter, ID, IResult, Result, ValueObject } from "types-ddd";
import ProductName, { NameProps } from "./product-name.value-object";
import ProductPrice, { PriceProps } from "./product-price.value-object";
import Product from "./product.aggregate";
import { ProductModel } from "./repository.interface";

export class ProductToDomainAdapter implements IAdapter<ProductModel, Product>{
	build(target: ProductModel): IResult<Product> {
		const { result, data } = ValueObject.createMany([
			Class<NameProps>(ProductName, { value: target.name }),
			Class<PriceProps>(ProductPrice, { value: target.price })
		]);

		if (result.isFail()) return Result.fail(result.error());
		
		const name = data.next().value() as ProductName;
		const price = data.next().value() as ProductPrice;

		const id = ID.create(target.id);
		const { createdAt, updatedAt } = target;

		return Product.create({ id, name, price, createdAt, updatedAt });
	}
}

export default ProductToDomainAdapter;
