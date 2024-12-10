import { Supplier } from '../supplier/supplier.entity';
import { Purchase } from "../purchase/purchase.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    productCategory: string;
    price: number;
    warranty: string;
    safetyRegulationsCompliance: string;
    reliability: number;
    deliveryTimeWeeks: number;
    supplier: Supplier;
    purchases: Purchase[];
}
