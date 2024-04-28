import Product from "./product.aggregate";

export class ProductModel {
	id!: string;
	name!: { value: string};
	price!: { value: number };
	createdAt!: Date;
	updatedAt!: Date;
}

export interface ProductRepositoryInterface {
	create(product: Product): Promise<void>;
	list(): Promise<ProductModel[]>;
	getProductById(id: string): Promise<Product | null>;
	update(product: Product): Promise<void>;
}

export default ProductRepositoryInterface;
