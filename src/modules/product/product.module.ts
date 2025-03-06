import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Supplier } from '../supplier/supplier.entity';
import {Purchase} from "../purchase/purchase.entity";
import {SupplierProduct} from "../supplierProduct/supplierProduct.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier, Purchase, SupplierProduct])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}



