"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const supplier_entity_1 = require("./supplier.entity");
const product_entity_1 = require("../product/product.entity");
let SupplierService = class SupplierService {
    constructor(supplierRepository, productRepository) {
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
    }
    async findAll() {
        return this.supplierRepository.find();
    }
    async getSuppliersByProduct(productId) {
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
            .getRawMany();
    }
};
exports.SupplierService = SupplierService;
exports.SupplierService = SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SupplierService);
//# sourceMappingURL=supplier.service.js.map