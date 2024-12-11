"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./modules/user/user.module");
const supplier_module_1 = require("./modules/supplier/supplier.module");
const product_module_1 = require("./modules/product/product.module");
const purchase_module_1 = require("./modules/purchase/purchase.module");
const auth_module_1 = require("./modules/auth/auth.module");
const criteriaWeight_module_1 = require("./modules/criteriaWeight/criteriaWeight.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'secret'),
                    database: configService.get('DB_NAME', 'supplyin_db'),
                    entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
                    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            supplier_module_1.SupplierModule,
            product_module_1.ProductModule,
            purchase_module_1.PurchaseModule,
            auth_module_1.AuthModule,
            criteriaWeight_module_1.CriteriaWeightModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map