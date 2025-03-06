import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Supplier } from '../supplier/supplier.entity';
import {Purchase} from "../purchase/purchase.entity";
import {SupplierProduct} from "../supplierProduct/supplierProduct.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  productCategory: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.id)
  supplier: Supplier;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];

  @OneToMany(() => SupplierProduct, (supplierProduct) => supplierProduct.product)
  supplierProducts: SupplierProduct[];

}
