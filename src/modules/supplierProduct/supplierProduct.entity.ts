import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Column } from 'typeorm';
import { Product } from '../product/product.entity';
import { Supplier } from '../supplier/supplier.entity';

@Entity()
export class SupplierProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    supplierId: string;

    @Column()
    productId: string;

    @ManyToOne(() => Supplier, (supplier) => supplier.supplierProducts)
    supplier: Supplier;

    @ManyToOne(() => Product, (product) => product.supplierProducts)
    product: Product;

    @Column()
    price: number;

    @Column()
    warranty: string;

    @Column()
    safetyRegulationsCompliance: string;

    @Column()
    reliability: number;

    @Column()
    deliveryTimeWeeks: number;
}

