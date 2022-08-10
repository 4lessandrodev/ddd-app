import Product from "./product.aggregate";

export class ProductDb {
	id!: string;
	name!: string;
	price!: number;
	createdAt!: Date;
	updatedAt!: Date;
}

export interface ProductRepositoryInterface {
	create(product: Product): Promise<void>;
	getProducts(): Promise<ProductDb[]>;
	getProductById(id: string): Promise<Product | null>;
	update(product: Product): Promise<void>;
}

export default ProductRepositoryInterface;
