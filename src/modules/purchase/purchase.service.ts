import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  async create(purchaseData: Purchase): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(purchaseData);
    return this.purchaseRepository.save(purchase);
  }

}
