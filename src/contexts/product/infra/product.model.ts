import { ProductModel as Model } from "src/contexts/product/domain/repository.interface";

export class ProductModel implements Model {
	id!: string;
	name!: { value: string };
	price!: { value: number };
	createdAt!: Date;
	updatedAt!: Date;
}

export default ProductModel;
