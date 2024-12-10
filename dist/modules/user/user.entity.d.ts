import { Purchase } from '../purchase/purchase.entity';
export declare class User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    isActive: boolean;
    purchases: Purchase[];
    hashPassword(): Promise<void>;
}
