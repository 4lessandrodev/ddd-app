import 'reflect-metadata';
import 'module-alias/register';
import { ProductModule } from "@product/infra/product.module";
import { InvoiceModule } from "@invoice/infra/invoice.module";
import { Server } from "./server";


export const main = (): void => {
	Server.build([ProductModule, InvoiceModule]);
	Server.start();
}
main();
