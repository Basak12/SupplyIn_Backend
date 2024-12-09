import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import {Product} from "../product/product.entity";

@Injectable()
export class SupplierService {
  constructor(
      @InjectRepository(Supplier)
      private supplierRepository: Repository<Supplier>,
      @InjectRepository(Product)
      private productRepository: Repository<Product>,

  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }
    async getSuppliersByProduct(productId: string) {
      console.log('backend', productId);
        return this.productRepository
            .createQueryBuilder('product')
            .innerJoinAndSelect('product.supplier', 'supplier')
            .where('product.id = :productId', { productId })
            .select([
                'supplier.id AS supplierId',
                'supplier.name AS supplierName',
                'supplier.contactInfo AS contactInfo',
                'product.price AS price',
                'product.deliveryTimeWeeks AS deliveryTimeWeeks',
                'product.warranty AS warranty',
                'product.safetyRegulationsCompliance AS compliance',
                'product.reliability AS reliability',
                'product.price AS price',
            ])
            .getRawMany();  // Veritabanından alınan sonuçları döner
    }

}
