import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerData: RegisterDTO): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        role: import(".prisma/client").$Enums.Role;
        cartId: string;
    } & {
        cart: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(req: any, res: any): Promise<void>;
    getUser(req: any): any;
    logout(res: any): Promise<void>;
}
