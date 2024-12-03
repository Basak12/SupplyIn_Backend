import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Supplier } from '../supplier/supplier.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import {ProductModule} from "../product/product.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, Supplier, Product, User]),
    ProductModule,
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
