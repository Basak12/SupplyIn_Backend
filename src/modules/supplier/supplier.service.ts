import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import {CriteriaWeight} from "../criteriaWeight/criteriaWeight.entity";

@Injectable()
export class SupplierService {
  constructor(
      @InjectRepository(Supplier)
      private supplierRepository: Repository<Supplier>,
      @InjectRepository(CriteriaWeight)
      private criteriaWeightRepository: Repository<CriteriaWeight>,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }
  async getSuppliersByProduct(productId: string) {
    return this.criteriaWeightRepository
        .createQueryBuilder("criteriaWeight")
        .innerJoinAndSelect("criteriaWeight.supplier", "supplier")
        .where("criteriaWeight.productId = :productId", { productId })
        .select([
          "supplier.id AS supplierId",
          "supplier.name AS supplierName",
          "supplier.contactInfo AS contactInfo",
          "criteriaWeight.price AS price",
          "criteriaWeight.deliveryTimeScore AS deliveryTimeScore",
          "criteriaWeight.warrantyScore AS warrantyScore",
          "criteriaWeight.complianceScore AS complianceScore",
          "criteriaWeight.reliabilityScore AS reliabilityScore",
        ])
        .getRawMany();
  }
}
