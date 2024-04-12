import { Fail, IResult, Result, ValueObject } from "types-ddd";

export interface PriceProps {
	value: number;
}

export class Amount extends ValueObject<PriceProps>{
	private constructor(props: PriceProps) {
		super(props, { disableSetters: true });
	}

	public static isValidProps({ value }: PriceProps): boolean {
		const { number } = this.validator;
		return number(value).isPositive();
	}

	public static create(props: PriceProps): IResult<Amount> {
		const message = 'value must be positive';

		if (!this.isValidProps(props)) return Fail(message);

		return Result.Ok(new Amount(props));
	}
}

export default Amount;
