/// <reference types="cookie-parser" />
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderItemDTO } from './dtos/create-order-item.dto';
import { Request } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(req: Request): Promise<{
        id: string;
        userId: string;
        date: Date;
        priceSum: import("@prisma/client/runtime/library").Decimal;
        comment: string;
        clientName: string;
        email: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        date: Date;
        priceSum: import("@prisma/client/runtime/library").Decimal;
        comment: string;
        clientName: string;
        email: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createOrderDto: CreateOrderDTO): Promise<{
        id: string;
        userId: string;
        date: Date;
        priceSum: import("@prisma/client/runtime/library").Decimal;
        comment: string;
        clientName: string;
        email: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateOrderDto: CreateOrderDTO): Promise<{
        id: string;
        userId: string;
        date: Date;
        priceSum: import("@prisma/client/runtime/library").Decimal;
        comment: string;
        clientName: string;
        email: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    createOrderItem(orderId: string, createOrderItemDto: CreateOrderItemDTO): Promise<{
        id: string;
        orderId: string;
        productId: string;
        amount: number;
        color: string;
        size: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createOrderFromCart(cart: any): Promise<{
        id: string;
        userId: string;
        date: Date;
        priceSum: import("@prisma/client/runtime/library").Decimal;
        comment: string;
        clientName: string;
        email: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
