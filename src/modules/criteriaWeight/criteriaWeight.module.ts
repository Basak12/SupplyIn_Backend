import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriteriaWeightController } from './criteriaWeight.controller';
import { CriteriaWeightService } from './criteriaWeight.service';
import { CriteriaWeight } from './criteriaWeight.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CriteriaWeight])],
    controllers: [CriteriaWeightController],
    providers: [CriteriaWeightService],
    exports: [CriteriaWeightService]
})
export class CriteriaWeightModule {}
