import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { Supplier } from '../supplier/supplier.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,

    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Supplier) private supplierRepository: Repository<Supplier>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  async create(purchaseData: Purchase): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(purchaseData);
    return this.purchaseRepository.save(purchase);
  }
  async createPurchase(
      userId: string,
      productId: string,
      supplierId: string,
      supplierScore: number
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new Error('Product not found');
    }

    const supplier = await this.supplierRepository.findOneBy({ id: supplierId });
    if (!supplier) {
      throw new Error('Supplier not found');
    }

    if (!supplierScore || supplierScore <= 0) {
      throw new Error('Invalid supplier score');
    }

    const purchase = this.purchaseRepository.create({
      purchaseDate: new Date(),
      user,
      product,
      supplier,
      supplierScore,
    });

    return await this.purchaseRepository.save(purchase);
  }


}
