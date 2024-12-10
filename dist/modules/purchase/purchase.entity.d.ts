import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Supplier } from '../supplier/supplier.entity';
export declare class Purchase {
    id: string;
    purchaseDate: Date;
    userId: string;
    supplierScore: number;
    user: User;
    product: Product;
    supplier: Supplier;
}
