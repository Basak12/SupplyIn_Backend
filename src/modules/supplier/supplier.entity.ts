import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';
import {Product} from "../product/product.entity";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactInfo: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];

}
