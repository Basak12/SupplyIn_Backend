import { Controller, Get, Post, Body } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  async findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Post()
  async createPurchase(@Body() body: { userId: string; productId: string; supplierId: string }) {
    const { userId, productId, supplierId } = body;
    return this.purchaseService.createPurchase(userId, productId, supplierId);
  }
}