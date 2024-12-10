"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriteriaWeightModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const criteriaWeight_controller_1 = require("./criteriaWeight.controller");
const criteriaWeight_service_1 = require("./criteriaWeight.service");
const criteriaWeight_entity_1 = require("./criteriaWeight.entity");
let CriteriaWeightModule = class CriteriaWeightModule {
};
exports.CriteriaWeightModule = CriteriaWeightModule;
exports.CriteriaWeightModule = CriteriaWeightModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([criteriaWeight_entity_1.CriteriaWeight])],
        controllers: [criteriaWeight_controller_1.CriteriaWeightController],
        providers: [criteriaWeight_service_1.CriteriaWeightService],
        exports: [criteriaWeight_service_1.CriteriaWeightService]
    })
], CriteriaWeightModule);
//# sourceMappingURL=criteriaWeight.module.js.map