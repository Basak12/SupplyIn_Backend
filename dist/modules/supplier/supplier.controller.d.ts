import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    findAll(): Promise<Supplier[]>;
    getSuppliersByProduct(productId: string): Promise<any[]>;
}
