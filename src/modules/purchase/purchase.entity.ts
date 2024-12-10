import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Supplier } from '../supplier/supplier.entity';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  purchaseDate: Date;

  @Column({ nullable: true }) //change after adding user
  userId: string;

  @Column('float')
  supplierScore: number;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Product, (product) => product.purchases)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Supplier, (supplier) => supplier.purchases)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

}


