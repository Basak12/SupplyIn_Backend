import { Purchase } from '../purchase/purchase.entity';
export declare class Supplier {
    id: string;
    name: string;
    contactInfo: string;
    purchases: Purchase[];
}
