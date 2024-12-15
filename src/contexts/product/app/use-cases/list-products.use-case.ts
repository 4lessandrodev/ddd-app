import RepositoryInterface, { ProductModel } from "@product/domain/repository.interface";
import { IUseCase } from "rich-domain";

export class ListProductsUseCase implements IUseCase<void, ProductModel[]> {
	constructor(private readonly repo: RepositoryInterface) { }
	
	async execute(): Promise<ProductModel[]> {
		return this.repo.list();
	}
}

export default ListProductsUseCase;
