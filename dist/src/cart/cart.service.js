"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUserCart(userId) {
        return this.prismaService.cart.findUnique({
            where: { userId },
            include: { cartItems: true },
        });
    }
    async addCartItem(userId, createCartItemDto) {
        const userCart = await this.prismaService.cart.findUnique({
            where: { userId },
        });
        if (!userCart) {
            throw new Error("User doesn't have a cart");
        }
        return this.prismaService.cartItem.create({
            data: {
                cartId: userCart.id,
                productId: createCartItemDto.productId,
                amount: createCartItemDto.amount,
                color: createCartItemDto.color,
                size: createCartItemDto.size,
                comment: createCartItemDto.comment,
            },
        });
    }
    async deleteCartItem(cartItemId) {
        return this.prismaService.cartItem.delete({
            where: { id: cartItemId },
        });
    }
    async updateCartItem(cartItemId, updateData) {
        return this.prismaService.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: updateData,
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map