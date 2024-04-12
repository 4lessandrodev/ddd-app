import { IResult, Result, ValueObject } from "rich-domain";

export interface NameProps {
	value: string;
}

export class ItemName extends ValueObject<NameProps>{
	private constructor(props: NameProps) {
		super(props);
	}

	validation(value: string): boolean {
		return ItemName.isValidProps({ value })
	}

	public static isValidProps({ value }: NameProps): boolean {
		const { string } = this.validator;
		return string(value).hasLengthBetweenOrEqual(3, 30);
	}

	public static create(props: NameProps): IResult<ItemName> {
		const message = 'value must have length min 3 and max 30 char';

		if (!this.isValidProps(props)) return Result.fail(message);

		return Result.Ok(new ItemName(props));
	}
}

export default ItemName;
