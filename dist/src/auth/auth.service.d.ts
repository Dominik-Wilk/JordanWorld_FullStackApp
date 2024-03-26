import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: RegisterDTO): Promise<{
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
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        role: import(".prisma/client").$Enums.Role;
        cartId: string;
    }>;
    createSession(user: any): Promise<{
        access_token: string;
    }>;
}
