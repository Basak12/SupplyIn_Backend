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
exports.PurchaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const purchase_entity_1 = require("./purchase.entity");
const user_entity_1 = require("../user/user.entity");
const product_entity_1 = require("../product/product.entity");
const supplier_entity_1 = require("../supplier/supplier.entity");
let PurchaseService = class PurchaseService {
    constructor(purchaseRepository, productRepository, supplierRepository, userRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.purchaseRepository.find();
    }
    async create(purchaseData) {
        const purchase = this.purchaseRepository.create(purchaseData);
        return this.purchaseRepository.save(purchase);
    }
    async createPurchase(userId, productId, supplierId, supplierScore) {
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
};
exports.PurchaseService = PurchaseService;
exports.PurchaseService = PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_entity_1.Purchase)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PurchaseService);
//# sourceMappingURL=purchase.service.js.map