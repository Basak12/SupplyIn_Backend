import {Controller, Get, Query} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async findAll(): Promise<Supplier[]> {
    return this.supplierService.findAll();
  }
  @Get('product')
  async getSuppliersByProductId(@Query('productId') productId: string) {
    return this.supplierService.getSuppliersByProductId(productId);
  }
}
