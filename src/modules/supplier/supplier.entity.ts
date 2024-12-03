import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactInfo: string;

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];

}
