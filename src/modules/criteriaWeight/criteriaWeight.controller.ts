import { Body, Controller, Post } from '@nestjs/common';
import { CriteriaWeightService } from './criteriaWeight.service';
import { CriteriaWeight } from './criteriaWeight.entity';

@Controller('criteriaWeight')
export class CriteriaWeightController {
    constructor(private readonly criteriaWeightService: CriteriaWeightService) {}

    @Post()
    async createCriteriaWeight(@Body() data: Partial<CriteriaWeight>) {
        return this.criteriaWeightService.saveCriteriaWeights(data);
    }
}
