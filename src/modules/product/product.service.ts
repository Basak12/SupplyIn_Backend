import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['supplier'] });
  }
  async getProductDetails(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['supplier'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async getSuppliersByProductName(productName: string) {
    console.log('backend', productName);
    return this.productRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.supplier', 'supplier')
        .where('product.name = :productName', { productName })
        .select([
          'supplier.id AS supplierId',
          'supplier.name AS supplierName',
          'supplier.contactInfo AS contactInfo',
          'product.price AS price',
          'product.deliveryTimeWeeks AS deliveryTimeWeeks',
          'product.warranty AS warranty',
          'product.safetyRegulationsCompliance AS compliance',
          'product.reliability AS reliability',
        ])
        .getRawMany();
  }
}
