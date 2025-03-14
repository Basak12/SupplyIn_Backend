import {Controller, Get, Param, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Get(':productId')
  async getProductDetails(@Param('productId') productId: string): Promise<Product> {
    return this.productService.getProductDetails(productId);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

}
