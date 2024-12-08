import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { CriteriaWeight } from '../criteriaWeight/criteriaWeight.entity'
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import {Product} from "../product/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, CriteriaWeight, Product])],
  providers: [SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
