import { Purchase } from '../purchase/purchase.entity';
import { Product } from "../product/product.entity";
export declare class Supplier {
    id: string;
    name: string;
    contactInfo: string;
    products: Product[];
    purchases: Purchase[];
}
