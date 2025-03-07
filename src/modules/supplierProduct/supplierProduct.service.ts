import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierProduct } from './supplierProduct.entity';
import { Product } from '../product/product.entity';
import {Supplier} from "../supplier/supplier.entity";

@Injectable()
export class SupplierProductService {
    constructor(
        @InjectRepository(SupplierProduct)
        private readonly supplierProductRepository: Repository<SupplierProduct>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>,
    ) {
    }

    async findAll(): Promise<SupplierProduct[]> {
        return this.supplierProductRepository.find({relations: ['supplier', 'product']});
    }

    async createSupplierProduct(data: {
        supplierId: string;
        productId: string,
        price: number,
        warranty: string,
        safetyRegulationsCompliance: string,
        reliability: number,
        deliveryTimeWeeks: number
    }) {
        const product = await this.productRepository.findOne({
            where: {id: data.productId},
        });
        const supplier = await this.supplierRepository.findOne({
            where: {id: data.supplierId},
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (!supplier) {
            throw new NotFoundException('Supplier not found');
        }

        const supplierProduct = this.supplierProductRepository.create({
            supplierId: data.supplierId,
            productId: data.productId,
            price: data.price,
            warranty: data.warranty,
            safetyRegulationsCompliance: data.safetyRegulationsCompliance,
            reliability: data.reliability,
            deliveryTimeWeeks: data.deliveryTimeWeeks,
        });
        return await this.supplierProductRepository.save(supplierProduct);
    }

    async getSupplierProduct(supplierProductId: string) {
        const supplierProduct = await this.supplierProductRepository.findOne({
            where: {id: supplierProductId},
            relations: ['supplier', 'product'],
        });
        if (!supplierProduct) {
            throw new NotFoundException(`SupplierProduct with ID ${supplierProductId} not found`);
        }
        return supplierProduct;
    }

    async getSupplierProductsByProductId(productId: string) {
        console.log('getSupplierProductsByProductId', productId);

        const supplierProducts = await this.supplierProductRepository.find({
            where: { productId },
            relations: ['supplier', 'product'],
        });

        if (!supplierProducts.length) {
            throw new NotFoundException(`SupplierProduct with Product ID ${productId} not found`);
        }

        return supplierProducts.map((supplierProduct) => ({
            id: supplierProduct.id,
            price: supplierProduct.price,
            deliveryTimeWeeks: supplierProduct.deliveryTimeWeeks,
            reliability: supplierProduct.reliability,
            warranty: supplierProduct.warranty,
            safetyRegulationsCompliance: supplierProduct.safetyRegulationsCompliance,
            supplier: supplierProduct.supplier,
            product: supplierProduct.product,
        }))
    }

}