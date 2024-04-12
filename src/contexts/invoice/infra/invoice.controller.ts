import { listInvoicesUseCase } from "./injection.service";
import { Request, Response, Router } from "express";
const route = Router();

export const InvoiceController = {

	GetInvoices: route.get('/invoices', async (_: Request, res: Response) => {
		const invoices = await listInvoicesUseCase.execute();
		return res.json({ invoices });
	})

}

export default InvoiceController;
