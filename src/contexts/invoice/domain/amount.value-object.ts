import { Fail, Result, ValueObject } from "rich-domain";

export interface PriceProps {
	value: number;
}

export class Amount extends ValueObject<PriceProps>{
	private constructor(props: PriceProps) {
		super(props);
	}

	public static isValidProps({ value }: PriceProps): boolean {
		const { number } = this.validator;
		return number(value).isPositive();
	}

	public static create(props: PriceProps): Result<Amount | null> {
		const message = 'value must be positive';

		if (!this.isValidProps(props)) return Fail(message);

		return Result.Ok(new Amount(props));
	}
}

export default Amount;
