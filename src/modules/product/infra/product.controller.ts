import { createProductUseCase, getProductsUseCase, updateProductUseCase } from "./injection.service";
import { Request, Response, Router } from "express";
const route = Router();

export const ProductController = {

	GetProducts: route.get('/products', async (_: Request, res: Response) => {
		const products = await getProductsUseCase.execute();
		return res.json({ products });
	}),

	CreateProduct: route.post('/products', async (req: Request, res: Response) => {
		const { name = '', price = 0 } = req.body;
		const result = await createProductUseCase.execute({ name: name, price: price });
		return res.json({ success: result.isOk(), message: result.error() });
	}),

	UpdateProduct: route.put('/products/:id', async (req: Request, res: Response) => {
		const { id = '' } = req['params'];
		const { name, price } = req.body;
		const result = await updateProductUseCase.execute({ id, name, price });
		return res.json({ success: result.isOk(), message: result.error() });
	}),

}

export default ProductController;
