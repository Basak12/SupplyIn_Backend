import { Repository } from 'typeorm';
import { CriteriaWeight } from './criteriaWeight.entity';
export declare class CriteriaWeightService {
    private readonly criteriaWeightRepository;
    constructor(criteriaWeightRepository: Repository<CriteriaWeight>);
    saveCriteriaWeights(data: any): Promise<CriteriaWeight[]>;
}
