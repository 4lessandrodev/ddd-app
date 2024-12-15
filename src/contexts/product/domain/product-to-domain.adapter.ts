import { Class, Adapter, Id, ValueObject } from "rich-domain";
import ProductName, { NameProps } from "./product-name.value-object";
import ProductPrice, { PriceProps } from "./product-price.value-object";
import Product from "./product.aggregate";
import { ProductModel } from "./repository.interface";

export class ProductToDomainAdapter implements Adapter<ProductModel, Product> {
	adaptOne(target: ProductModel): Product {
		const { result, data } = ValueObject.createMany([
			Class<NameProps>(ProductName, { value: target.name.value }),
			Class<PriceProps>(ProductPrice, { value: target.price.value })
		]);

		if (result.isFail()) throw new Error(result.error());

		const name = data.next().value() as ProductName;
		const price = data.next().value() as ProductPrice;

		const id = Id(target.id);
		const { createdAt, updatedAt } = target;

		return Product.create({ id, name, price, createdAt, updatedAt }).value();
	}
}

export default ProductToDomainAdapter;
