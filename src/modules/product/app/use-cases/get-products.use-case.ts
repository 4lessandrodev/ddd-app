import ProductRepositoryInterface, { ProductDb } from "@product/domain/repository.interface";
import { IUseCase } from "rich-domain/types";

export class GetProductsUseCase implements IUseCase<void, ProductDb[]> {
	constructor(private readonly repo: ProductRepositoryInterface) { }
	
	async execute(): Promise<ProductDb[]> {
		return this.repo.getProducts();
	}
}

export default GetProductsUseCase;
