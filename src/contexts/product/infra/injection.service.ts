import CreateProductUseCase from '@product/app/use-cases/create-product.use-case';
import GetProductsUseCase from '@product/app/use-cases/list-products.use-case';
import UpdateProductUseCase from '@product/app/use-cases/update-product.use-case';
import ProductCreatedEvent from '@product/domain/product-created.event';
import ProductToDomainAdapter from '@product/domain/product-to-domain.adapter';
import ProductModel from './product.model';
import ProductRepository from './repository';

export const database: Array<ProductModel> = [];

const event = new ProductCreatedEvent();
const adapter = new ProductToDomainAdapter();
const repository = new ProductRepository(adapter, database);
export const getProductsUseCase = new GetProductsUseCase(repository);
export const updateProductUseCase = new UpdateProductUseCase(repository);
export const createProductUseCase = new CreateProductUseCase(repository, event);
