import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Supplier } from '../supplier/supplier.entity';
export declare class PurchaseService {
    private purchaseRepository;
    private productRepository;
    private supplierRepository;
    private userRepository;
    constructor(purchaseRepository: Repository<Purchase>, productRepository: Repository<Product>, supplierRepository: Repository<Supplier>, userRepository: Repository<User>);
    findAll(): Promise<Purchase[]>;
    create(purchaseData: Purchase): Promise<Purchase>;
    createPurchase(userId: string, productId: string, supplierId: string, supplierScore: number): Promise<Purchase>;
}
