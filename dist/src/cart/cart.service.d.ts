import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
export declare class CartService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUserCart(userId: string): Promise<{
        cartItems: {
            id: string;
            cartId: string;
            productId: string;
            amount: number;
            color: string;
            size: string;
            comment: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addCartItem(userId: string, createCartItemDto: CreateCartItemDto): Promise<{
        id: string;
        cartId: string;
        productId: string;
        amount: number;
        color: string;
        size: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCartItem(cartItemId: string): Promise<{
        id: string;
        cartId: string;
        productId: string;
        amount: number;
        color: string;
        size: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCartItem(cartItemId: string, updateData: CreateCartItemDto): Promise<{
        id: string;
        cartId: string;
        productId: string;
        amount: number;
        color: string;
        size: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
