import { CartService } from './cart.service';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getUserCart(req: any): Promise<{
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
    addCartItem(req: any, createCartItemDto: CreateCartItemDto): Promise<{
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
