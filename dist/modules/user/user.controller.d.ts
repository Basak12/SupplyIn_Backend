import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    getUserPurchases(id: string): Promise<{
        purchases: import("../purchase/purchase.entity").Purchase[];
    }>;
    getUser(id: string): Promise<{
        user: User;
    }>;
    create(userData: Partial<User>): Promise<{
        email: string;
        password: any;
        name: string;
        surname: string;
        isActive: true;
    } & User>;
}
