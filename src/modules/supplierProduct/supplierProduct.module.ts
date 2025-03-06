import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierProductController } from './supplierProduct.controller';
import { SupplierProductService } from './supplierProduct.service';
import {SupplierProduct} from "./supplierProduct.entity";
import {Product} from "../product/product.entity";
import {Supplier} from "../supplier/supplier.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SupplierProduct, Supplier, Product])],
    controllers: [SupplierProductController],
    providers: [SupplierProductService],
    exports: [SupplierProductService]
})
export class SupplierProductModule {}
