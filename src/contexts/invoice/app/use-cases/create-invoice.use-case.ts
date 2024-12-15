import { IUseCase } from "rich-domain";
import { Class, Result, ValueObject } from "rich-domain";
import ItemName, { NameProps } from "@invoice/domain/item-name.value-object";
import Invoice from "@invoice/domain/invoice.aggregate";
import Amount, { PriceProps } from "@invoice/domain/amount.value-object";
import RepositoryInterface from "@invoice/domain/repository.interface";

export interface CreateInvoiceDto {
	itemName: string;
	amount: number;
}

export class CreateInvoiceUseCase implements IUseCase<CreateInvoiceDto, Result<void>>{

	constructor(
		private readonly repo: RepositoryInterface
	) { }

	async execute(dto: CreateInvoiceDto): Promise<Result<void>> {

		const { data, result } = ValueObject.createMany([
			Class<PriceProps>(Amount, { value: dto.amount }),
			Class<NameProps>(ItemName, { value: dto.itemName })
		])

		if (result.isFail()) return Result.fail(result.error());

		const amount = data.next().value() as Amount;
		const itemName = data.next().value() as ItemName;

		const invoice = Invoice.create({ itemName, amount }).value();

		await this.repo.create(invoice);

		return Result.Ok();
	}
}

export default CreateInvoiceUseCase;
