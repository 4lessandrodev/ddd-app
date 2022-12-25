import { ProductModel as Model } from "@product/domain/repository.interface";

export class ProductModel implements Model {
	id!: string;
	name!: string;
	price!: number;
	createdAt!: Date;
	updatedAt!: Date;
}

export default ProductModel;
