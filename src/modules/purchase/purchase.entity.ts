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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  purchaseDate: Date;

  @Column()
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


