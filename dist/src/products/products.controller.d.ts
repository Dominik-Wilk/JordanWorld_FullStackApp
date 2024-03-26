import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAll(): Promise<{
        id: string;
        title: string;
        photo: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        photo: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
    }>;
    create(productData: CreateProductDTO): Promise<{
        id: string;
        title: string;
        photo: string;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
    }>;
}
