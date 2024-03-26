import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): any;
    getById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        role: import(".prisma/client").$Enums.Role;
        cartId: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
