import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
export declare class PurchaseController {
    private readonly purchaseService;
    constructor(purchaseService: PurchaseService);
    findAll(): Promise<Purchase[]>;
    createPurchase(body: {
        userId: string;
        productId: string;
        supplierId: string;
    }): Promise<Purchase>;
}
