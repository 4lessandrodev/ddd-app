import ProductRepositoryInterface, { ProductModel } from "@product/domain/repository.interface";
import { IUseCase } from "rich-domain/types";

export class GetProductsUseCase implements IUseCase<void, ProductModel[]> {
	constructor(private readonly repo: ProductRepositoryInterface) { }
	
	async execute(): Promise<ProductModel[]> {
		return this.repo.getProducts();
	}
}

export default GetProductsUseCase;
