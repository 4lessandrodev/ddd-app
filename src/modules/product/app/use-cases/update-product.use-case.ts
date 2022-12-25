import ProductName, { NameProps } from "@product/domain/product-name.value-object";
import ProductPrice, { PriceProps } from "@product/domain/product-price.value-object";
import ProductRepositoryInterface from "@product/domain/repository.interface";
import { IUseCase } from "rich-domain/types";
import { Class, Result, ValueObject } from "types-ddd";

export interface UpdateProductDto {
	id: string;
	name: string;
	price: number;
}

export class UpdateProductUseCase implements IUseCase<UpdateProductDto, Result<void>>{

	constructor(private readonly repo: ProductRepositoryInterface){}

	async execute(dto: UpdateProductDto): Promise<Result<void>> {
		try {
			const productFound = await this.repo.getProductById(dto.id);

			if (!productFound) return Result.fail('Product not found');

			const product = productFound;

			const { result, data } = ValueObject.createMany([
				Class<NameProps>(ProductName, { value: dto.name }),
				Class<PriceProps>(ProductPrice, { value: dto.price })
			]);
			
			if (result.isFail()) return Result.fail(result.error());

			const name = data.next().value() as ProductName;
			const price = data.next().value() as ProductPrice;

			product.set('name').to(name);
			product.set('price').to(price);

			await this.repo.update(product);

			return Result.Ok();

		} catch (error: any) {
			return Result.fail(error.message);
		}
	}
}

export default UpdateProductUseCase;
