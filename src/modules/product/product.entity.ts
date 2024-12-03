import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Supplier } from '../supplier/supplier.entity';
import {Purchase} from "../purchase/purchase.entity";

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

  @ManyToOne(() => Supplier, (supplier) => supplier.id)
  supplier: Supplier;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];

}
