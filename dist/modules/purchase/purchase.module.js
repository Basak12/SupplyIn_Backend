"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const purchase_entity_1 = require("./purchase.entity");
const purchase_service_1 = require("./purchase.service");
const purchase_controller_1 = require("./purchase.controller");
const supplier_entity_1 = require("../supplier/supplier.entity");
const product_entity_1 = require("../product/product.entity");
const user_entity_1 = require("../user/user.entity");
const product_module_1 = require("../product/product.module");
let PurchaseModule = class PurchaseModule {
};
exports.PurchaseModule = PurchaseModule;
exports.PurchaseModule = PurchaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([purchase_entity_1.Purchase, supplier_entity_1.Supplier, product_entity_1.Product, user_entity_1.User]),
            product_module_1.ProductModule,
        ],
        providers: [purchase_service_1.PurchaseService],
        controllers: [purchase_controller_1.PurchaseController],
    })
], PurchaseModule);
//# sourceMappingURL=purchase.module.js.map