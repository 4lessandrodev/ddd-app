import { Fail, IResult, Result, ValueObject } from "types-ddd";

export interface PriceProps {
	value: number;
}

export class ProductPrice extends ValueObject<PriceProps>{
	private constructor(props: PriceProps) {
		super(props, { disableSetters: true });
	}

	public static isValidProps({ value }: PriceProps): boolean {
		const { number } = this.validator;
		return number(value).isPositive();
	}

	public static create(props: PriceProps): IResult<ProductPrice> {
		const message = 'value must be positive';

		if (!this.isValidProps(props)) return Fail(message);

		return Result.Ok(new ProductPrice(props));
	}
}

export default ProductPrice;
