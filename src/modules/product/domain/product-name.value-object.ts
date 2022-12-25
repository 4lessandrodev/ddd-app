import { IResult, Result, ValueObject } from "types-ddd";

export interface NameProps {
	value: string;
}

export class ProductName extends ValueObject<NameProps>{
	private constructor(props: NameProps) {
		super(props);
	}

	validation(value: string): boolean {
		return ProductName.isValidProps({ value })
	}

	public static isValidProps({ value }: NameProps): boolean {
		const { string } = this.validator;
		return string(value).hasLengthBetweenOrEqual(3, 30);
	}

	public static create(props: NameProps): IResult<ProductName> {
		const message = 'value must have length min 3 and max 30 char';

		if (!this.isValidProps(props)) return Result.fail(message);

		return Result.Ok(new ProductName(props));
	}
}

export default ProductName;
