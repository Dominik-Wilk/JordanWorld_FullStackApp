import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dtos/create-product.dto';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<Product[]>;
    getById(id: Product['id']): Promise<Product | null>;
    create(productData: CreateProductDTO): Promise<Product>;
}
