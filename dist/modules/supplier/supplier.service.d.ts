import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { Product } from "../product/product.entity";
export declare class SupplierService {
    private supplierRepository;
    private productRepository;
    constructor(supplierRepository: Repository<Supplier>, productRepository: Repository<Product>);
    findAll(): Promise<Supplier[]>;
    getSuppliersByProductId(productId: string): Promise<any[]>;
    getSuppliersByProductName(productName: string): Promise<any[]>;
}
