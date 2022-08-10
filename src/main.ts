import 'module-alias/register';
import 'reflect-metadata';
import { ProductModule } from "./modules/product/infra/product.module";
import { Server } from "./server";


export const main = (): void => {
	Server.build([ProductModule]);
	Server.start();
}
main();
