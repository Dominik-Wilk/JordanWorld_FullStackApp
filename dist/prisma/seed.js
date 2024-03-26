"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const role_1 = require("./enums/role");
const db = new client_1.PrismaClient();
function getProducts() {
    return [
        {
            id: 'shoes1',
            title: 'Air Jordan 1 High SE ',
            photo: 'Photo1',
            price: 184.99,
            description: 'Elevate your sneaker game with the Air Jordan 1 SE High-Top Sneakers in a timeless beige hue. These iconic high-tops seamlessly blend unique style with outstanding comfort.\n\n' +
                '- Impeccable craftsmanship showcased through luxurious suede and leather panels on the upper\n' +
                '- Secure lace-up closure for a personalized fit\n' +
                '- The Nike Swoosh elegantly wraps around the heel, forming a convenient pull tab\n' +
                '- Enjoy added comfort with a padded collar and an exposed foam tongue\n' +
                '- Perforations on the heel enhance breathability\n' +
                '- Elevated foam midsoles provide extra cushioning for every step\n' +
                '- The rubber Waffle outsole not only ensures durable traction but also exudes heritage style\n\n' +
                'Elevate your sneaker collection with the Air Jordan 1 Hogh SE, where refined fashion meets uncompromised comfort.',
        },
        {
            id: 'shoes2',
            title: 'AIR JORDAN 1 MID 365',
            photo: 'Photo2',
            price: 159.99,
            description: 'Step into style and comfort with the WMNS Air Jordan 1 MID 365 High-Top Sneakers. These sneakers redefine casual chic, combining a modern aesthetic with the timeless Air Jordan legacy.\n\n' +
                '- Immerse yourself in impeccable craftsmanship with the premium suede and leather panels adorning the upper\n' +
                '- Achieve a personalized fit with the secure lace-up closure\n' +
                '- Experience elegance as the iconic Nike Swoosh gracefully wraps around the heel, forming a convenient pull tab\n' +
                '- Indulge in added comfort with a padded collar and an exposed foam tongue\n' +
                '- Soft suede overlays pay tribute to vintage materials, while durable textile underlays ensure lasting quality\n' +
                '- Perforations on the heel not only enhance breathability but also add a touch of style\n\n' +
                'Elevate your sneaker collection with the WMNS Air Jordan 1 MID 365, where refined fashion meets uncompromised comfort.',
        },
        {
            id: 'shoes3',
            title: 'Air Jordan 1 Mid SE',
            photo: 'Photo3',
            price: 120.0,
            description: 'The Air Jordan 1 Mid SE is an iconic pair of shoes that seamlessly blends unique style with outstanding comfort.\n\n' +
                '- Luxurious suede and leather panels on the upper showcase impeccable craftsmanship\n' +
                '- Features a secure lace-up closure\n' +
                '- The Swoosh elegantly wraps around the heel, forming a convenient pull tab\n' +
                '- Enjoy added comfort with a padded collar and an exposed foam tongue\n' +
                '- Soft suede overlays pay homage to vintage materials, while durable textile underlays ensure longevity\n' +
                '- Perforations on the heel enhance breathability\n' +
                '- Elevated foam midsoles provide extra cushioning\n' +
                '- The rubber Waffle outsole not only ensures durable traction but also exudes heritage style\n\n' +
                'Elevate your sneaker collection with the Air Jordan 1 MID SE, where refined fashion meets uncompromised comfort.',
        },
        {
            id: 'shoes4',
            title: 'Air Jordan 1 High',
            photo: 'Photo4',
            price: 149.99,
            description: 'Elevate your sneaker game with the Air Jordan 1 High-Top Sneakers in a vibrant green hue. These iconic high-tops seamlessly blend streetwear style with outstanding comfort, making them a must-have for sneaker enthusiasts.\n\n' +
                '- Achieve a personalized fit with the secure lace-up closure\n' +
                '- Experience an added touch of style as the iconic Nike Swoosh gracefully wraps around the heel, forming a convenient pull tab\n' +
                '- Indulge in superior comfort with a padded collar and an exposed foam tongue\n' +
                '- Soft suede overlays pay homage to vintage materials, while durable textile underlays ensure long-lasting quality\n' +
                '- Perforations on the heel not only enhance breathability but also add a distinctive flair\n' +
                '- Elevated foam midsoles provide extra cushioning for each step\n\n' +
                'Elevate your sneaker collection with the Air Jordan 1 High, where refined fashion meets uncompromised comfort.',
        },
        {
            id: 'shoes5',
            title: 'Air Jordan 1 High ',
            photo: 'Photo5',
            price: 154.99,
            description: 'Step into a realm of timeless style and exceptional comfort with the Air Jordan 1 High-Top Sneakers in an elegant white and brown colorway. These iconic high-tops seamlessly fuse classic design with modern flair, establishing themselves as essential footwear for sneaker enthusiasts.\n\n' +
                '- Immerse yourself in the artistry of impeccable craftsmanship, featuring premium suede and leather panels that adorn the upper\n' +
                '- Achieve a personalized fit with the secure lace-up closure\n' +
                '- Experience an added touch of sophistication as the iconic Nike Swoosh elegantly wraps around the heel, forming a convenient pull tab\n' +
                '- Soft suede overlays pay homage to vintage materials, while durable textile underlays ensure enduring quality\n' +
                '- The rubber Waffle outsole not only guarantees durable traction but also radiates heritage style\n\n' +
                'Make a refined statement with the Air Jordan 1 High-Top Sneakers in white and brown, where classic charm meets contemporary allure.',
        },
        {
            id: 'shoes6',
            title: 'Air Jordan 1 High',
            photo: 'Photo6',
            price: 124.99,
            description: 'Step into the epitome of timeless style and unparalleled comfort with the Air Jordan 1 High-Top Sneakers in an enchanting white and pink colorway. These iconic high-tops flawlessly blend classic design with a modern touch, solidifying their status as essential footwear for passionate sneaker enthusiasts.\n' +
                '- Immerse yourself in the artistry of impeccable craftsmanship, showcasing premium suede and leather panels that grace the upper\n' +
                '- Achieve a personalized fit with the secure lace-up closure\n' +
                '- Soft suede overlays pay homage to vintage materials, while durable textile underlays ensure enduring quality\n' +
                '- Perforations on the heel not only enhance breathability but also add a distinctive touch of style\n' +
                '- Elevated foam midsoles deliver extra cushioning for each step\n' +
                '- The rubber Waffle outsole not only guarantees durable traction but also radiates heritage style\n\n' +
                'Elevate your sneaker collection with the Air Jordan 1 High, where refined fashion meets uncompromised comfort.',
        },
        {
            id: 'shoes7',
            title: 'Air Jordan 1 High',
            photo: 'Photo7',
            price: 99.99,
            description: 'Elevate your sneaker game with the Air Jordan 1 High-Top Sneakers in a captivating shade of purple. These iconic high-tops seamlessly merge bold design with exceptional comfort, establishing themselves as a must-have for dedicated sneaker enthusiasts.\n\n' +
                '- Immerse yourself in the artistry of impeccable craftsmanship, featuring premium suede and leather panels that adorn the upper\n' +
                '- Achieve a personalized fit with the secure lace-up closure\n' +
                '- Soft suede overlays pay homage to vintage materials, while durable textile underlays ensure enduring quality\n' +
                '- Perforations on the heel not only enhance breathability but also add a distinctive touch of style\n' +
                '- Elevated foam midsoles deliver extra cushioning for each step\n' +
                '- The rubber Waffle outsole not only guarantees durable traction but also radiates heritage style\n\n' +
                'Elevate your sneaker collection with the Air Jordan 1 High, where refined fashion meets uncompromised comfort.',
        },
        {
            id: 'shoes8',
            title: 'Air Jordan 1 MID 365',
            photo: 'Photo8',
            price: 180.0,
            description: 'Step into the epitome of chic style and comfort with the WMNS Air Jordan 1 MID 365 High-Top Sneakers in pristine white. These iconic high-tops redefine casual elegance, seamlessly blending modern aesthetics with the timeless Air Jordan legacy.\n\n' +
                '- Immerse yourself in impeccable craftsmanship with the premium suede and leather panels adorning the upper\n' +
                '- Achieve a personalized fit with the secure lace-up closure\n' +
                '- Experience an added touch of sophistication as the iconic Nike Swoosh elegantly wraps around the heel, forming a convenient pull tab\n' +
                '- Indulge in superior comfort with a padded collar and an exposed foam tongue\n' +
                '- Soft suede overlays pay homage to vintage materials, while durable textile underlays ensure enduring quality\n' +
                '- Perforations on the heel not only enhance breathability but also add a distinctive touch of style\n' +
                '- Elevated foam midsoles provide extra cushioning for each step\n' +
                '- The rubber Waffle outsole not only guarantees durable traction but also exudes heritage style\n\n' +
                'Elevate your sneaker collection with the WMNS Air Jordan 1 MID 365, where refined fashion meets uncompromised comfort.',
        },
    ];
}
function getUsers() {
    return [
        {
            id: '5671b233-155b-4404-8b20-c3ad34e428jd',
            name: 'Jane Doe',
            email: 'janedoe@gmail.com',
            address: '84 High Street, Glasgow',
            role: role_1.Role.USER,
        },
        {
            id: '5671b233-155b-4404-8b20-c3ad34e4277a',
            name: 'John Doe',
            email: 'johndoe@JordanWorld.com',
            address: '91 Ivy Crescent, London',
            role: role_1.Role.ADMIN,
        },
    ];
}
function getPasswords() {
    return [
        {
            user: { connect: { id: '5671b233-155b-4404-8b20-c3ad34e428jd' } },
            hashedPassword: 'hashed_password_1',
        },
        {
            user: { connect: { id: '5671b233-155b-4404-8b20-c3ad34e4277a' } },
            hashedPassword: 'hashed_password_2',
        },
    ];
}
function getCarts() {
    return [
        {
            id: 'cart1',
            user: { connect: { id: '5671b233-155b-4404-8b20-c3ad34e428jd' } },
        },
        {
            id: 'cart2',
            user: { connect: { id: '5671b233-155b-4404-8b20-c3ad34e4277a' } },
        },
    ];
}
function getCartItems() {
    return [
        {
            cart: { connect: { id: 'cart1' } },
            product: { connect: { id: 'shoes1' } },
            amount: 1,
            color: 'White',
            size: '9US',
            comment: 'Please, deliver faster!',
        },
        {
            cart: { connect: { id: 'cart2' } },
            product: { connect: { id: 'shoes2' } },
            amount: 2,
            color: 'Purple',
            size: '11US',
            comment: 'Please use gift wrap for packaging. Send without an invoice (the invoice will be sent to my email address).',
        },
    ];
}
function getOrders() {
    return [
        {
            id: 'order1',
            user: { connect: { id: '5671b233-155b-4404-8b20-c3ad34e428jd' } },
            date: new Date(),
            priceSum: 74.99,
            comment: 'Please, deliver faster!',
            clientName: 'Jane Doe',
            email: 'janedoe@gmail.com',
            address: '84 High Street, Glasgow',
        },
    ];
}
function getOrderItems() {
    return [
        {
            order: { connect: { id: 'order1' } },
            product: { connect: { id: 'shoes1' } },
            amount: 1,
            color: 'White',
            size: '9US',
            comment: 'Please, deliver faster!',
        },
    ];
}
async function seed() {
    await db.orderItem.deleteMany();
    await db.order.deleteMany();
    await db.cartItem.deleteMany();
    await db.cart.deleteMany();
    await db.user.deleteMany();
    await db.product.deleteMany();
    for (const product of getProducts()) {
        await db.product.create({ data: product });
    }
    for (const user of getUsers()) {
        await db.user.create({ data: user });
    }
    for (const password of getPasswords()) {
        await db.password.create({ data: password });
    }
    for (const cart of getCarts()) {
        await db.cart.create({ data: cart });
    }
    for (const cartItem of getCartItems()) {
        await db.cartItem.create({ data: cartItem });
    }
    for (const order of getOrders()) {
        await db.order.create({ data: order });
    }
    for (const orderItem of getOrderItems()) {
        await db.orderItem.create({ data: orderItem });
    }
}
seed()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await db.$disconnect();
});
//# sourceMappingURL=seed.js.map