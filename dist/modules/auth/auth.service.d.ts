import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from "../user/user.entity";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(userData: Partial<User>): Promise<{
        email: string;
        password: any;
        name: string;
        surname: string;
        isActive: true;
    } & User>;
    login(user: User): Promise<{
        access_token: string;
    }>;
    validateUser(email: string, password: string): Promise<any>;
}
