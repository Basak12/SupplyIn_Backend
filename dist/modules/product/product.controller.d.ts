import { ProductService } from './product.service';
import { Product } from './product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProductDetails(productId: string): Promise<Product>;
    findAll(): Promise<Product[]>;
    getSuppliersByProductName(productName: string): Promise<any[]>;
}
