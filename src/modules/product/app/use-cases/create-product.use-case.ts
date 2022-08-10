import { IUseCase, IHandle } from "rich-domain/types";
import { Class, Result, ValueObject } from "types-ddd";
import ProductName, { NameProps } from "@product/domain/product-name.value-object";
import Product from "@product/domain/product.aggregate";
import ProductPrice, { PriceProps } from "@product/domain/product-price.value-object";
import ProductRepositoryInterface from "@product/domain/repository.interface";

export interface CreateProductDto {
	nameValue: string;
	priceValue: number;
}

export class CreateProductUseCase implements IUseCase<CreateProductDto, Result<void>>{

	constructor(
		private readonly repo: ProductRepositoryInterface,
		private readonly event: IHandle<Product>
	) { }

	async execute({ nameValue, priceValue }: CreateProductDto): Promise<Result<void>> {
		try {

			const { data, result } = ValueObject.createMany([
				Class<PriceProps>(ProductPrice, { value: priceValue }),
				Class<NameProps>(ProductName, { value: nameValue })
			])

			if (result.isFail()) return Result.fail(result.error());

			const price = data.next().value() as ProductPrice;
			const name = data.next().value() as ProductName;

			const product = Product.create({ name, price }).value();

			product.addEvent(this.event);
			
			await this.repo.create(product);

			return Result.Ok();
						
		} catch (error: any) {

			return Result.fail(error.message);

		}
	}
}

export default CreateProductUseCase;
