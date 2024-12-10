import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    getProductDetails(productId: string): Promise<Product>;
    getSuppliersByProductName(productName: string): Promise<any[]>;
}
