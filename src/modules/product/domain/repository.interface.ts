import Product from "./product.aggregate";

export class ProductModel {
	id!: string;
	name!: string;
	price!: number;
	createdAt!: Date;
	updatedAt!: Date;
}

export interface ProductRepositoryInterface {
	create(product: Product): Promise<void>;
	getProducts(): Promise<ProductModel[]>;
	getProductById(id: string): Promise<Product | null>;
	update(product: Product): Promise<void>;
}

export default ProductRepositoryInterface;
