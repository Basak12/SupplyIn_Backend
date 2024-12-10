import { AuthService } from './auth.service';
import { User } from "../user/user.entity";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: Partial<User>): Promise<{
        email: string;
        password: any;
        name: string;
        surname: string;
        isActive: true;
    } & User>;
    login(loginData: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
}
