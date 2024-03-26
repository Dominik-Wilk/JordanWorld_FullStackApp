import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Order, OrderItem } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderItemDTO } from './dtos/create-order-item.dto';
export declare class OrdersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(userId?: string): Promise<Order[]>;
    findOne(id: string): Promise<Order | null>;
    create(data: CreateOrderDTO): Promise<Order>;
    update(id: string, data: Prisma.OrderUpdateInput): Promise<Order>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createOrderItem(data: CreateOrderItemDTO): Promise<OrderItem>;
    createOrderFromCart(cart: any): Promise<Order>;
}
