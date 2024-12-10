import { CriteriaWeightService } from './criteriaWeight.service';
import { CriteriaWeight } from './criteriaWeight.entity';
export declare class CriteriaWeightController {
    private readonly criteriaWeightService;
    constructor(criteriaWeightService: CriteriaWeightService);
    createCriteriaWeight(data: Partial<CriteriaWeight>): Promise<CriteriaWeight[]>;
}
