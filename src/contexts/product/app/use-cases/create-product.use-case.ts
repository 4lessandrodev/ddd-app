import { Fail, IUseCase, Ok } from "rich-domain";
import { Class, Result, ValueObject } from "rich-domain";
import ProductName, { NameProps } from "@product/domain/product-name.value-object";
import Product from "@product/domain/product.aggregate";
import ProductPrice, { PriceProps } from "@product/domain/product-price.value-object";
import ProductRepositoryInterface from "@product/domain/repository.interface";

export interface CreateProductDto {
	name: string;
	price: number;
}

export class CreateProductUseCase implements IUseCase<CreateProductDto, Result<void>>{

	constructor(
		private readonly repo: ProductRepositoryInterface
	) { }

	async execute(dto: CreateProductDto): Promise<Result<void>> {

		const { data, result } = ValueObject.createMany([
			Class<PriceProps>(ProductPrice, { value: dto.price }),
			Class<NameProps>(ProductName, { value: dto.name })
		])

		if (result.isFail()) return Fail(result.error());

		const price = data.next().value() as ProductPrice;
		const name = data.next().value() as ProductName;

		const product = Product.create({ name, price }).value();

		await this.repo.create(product);

		return Ok();
	}
}

export default CreateProductUseCase;
