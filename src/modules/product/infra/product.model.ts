import { ProductDb } from "@product/domain/repository.interface";

export class ProductModel implements ProductDb {
	id!: string;
	name!: string;
	price!: number;
	createdAt!: Date;
	updatedAt!: Date;
}

export default ProductModel;
