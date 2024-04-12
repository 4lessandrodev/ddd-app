import Product from "src/contexts/product/domain/product.aggregate";
import ProductRepositoryInterface from "src/contexts/product/domain/repository.interface";
import { IAdapter } from "rich-domain";
import ProductModel from "./product.model";

export class ProductRepository implements ProductRepositoryInterface{
	constructor(
		private readonly adapter: IAdapter<ProductModel, Product>,
		private readonly db: Array<ProductModel>
	) { }
	
	async getProductById(id: string): Promise<Product | null> {
		const product = this.db.find((pd) => pd.id === id);
		if (!product) return null;
		const adaptedProduct = this.adapter.build(product).value();
		return adaptedProduct;
	}

	async create(product: Product): Promise<void> {
		this.db.push(product.toObject());
		product.dispatchEvent('ProductCreated');
	}

	async list(): Promise<ProductModel[]> {
		return this.db;
	}

	async update(product: Product): Promise<void> {
		const index = this.db.findIndex((pd) => pd.id === product.id.value());
		const exists = index !== -1;
		if (!exists) return;
		this.db.splice(index, 1);
		this.db.push(product.toObject());
		product.dispatchAll();
	}
}

export default ProductRepository;
