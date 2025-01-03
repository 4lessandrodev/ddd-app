import { Fail, Result, ValueObject } from "rich-domain";

export interface PriceProps {
	value: number;
}

export class ProductPrice extends ValueObject<PriceProps>{
	private constructor(props: PriceProps) {
		super(props);
	}

	public static isValidProps({ value }: PriceProps): boolean {
		const { number } = this.validator;
		return number(value).isPositive();
	}

	public static create(props: PriceProps): Result<ProductPrice | null> {
		const message = 'value must be positive';

		if (!this.isValidProps(props)) return Fail(message);

		return Result.Ok(new ProductPrice(props));
	}
}

export default ProductPrice;
