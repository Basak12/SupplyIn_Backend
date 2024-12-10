import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    createUser(email: string, password: string, name: string, surname: string): Promise<{
        email: string;
        password: string;
        name: string;
        surname: string;
        isActive: true;
    } & User>;
    getUserWithPurchases(userId: string): Promise<import("../purchase/purchase.entity").Purchase[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
