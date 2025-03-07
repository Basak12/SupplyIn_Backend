import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { SupplierProductService } from './supplierProduct.service';
import { SupplierProduct } from './supplierProduct.entity';
import {Product} from "../product/product.entity";

@Controller('supplierProduct')
export class SupplierProductController {
    constructor(private readonly supplierProductService: SupplierProductService) {}

    @Post('create')
    async createSupplierProduct(@Body() data: Partial<SupplierProduct>) {
        return this.supplierProductService.createSupplierProduct({ supplierId: data.supplierId, productId: data.productId,
            price: data.price,
            warranty:data.warranty,
            safetyRegulationsCompliance: data.safetyRegulationsCompliance,
            reliability: data.reliability,
            deliveryTimeWeeks: data.deliveryTimeWeeks
        });
    }
    @Get(':supplierProductId')
    async getSupplierProduct(@Param('supplierProductId') supplierProductId: string) {
        return this.supplierProductService.getSupplierProduct(supplierProductId);
    }

    @Get('byProduct/:productId')
    async getSuppliersByProductId(@Query('productId') productId: string) {
        return this.supplierProductService.getSupplierProductsByProductId(productId);
    }

    @Get()
    async findAll(): Promise<SupplierProduct[]> {
        return this.supplierProductService.findAll();
    }
}

