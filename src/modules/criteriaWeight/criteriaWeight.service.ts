import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriteriaWeight } from './criteriaWeight.entity';

@Injectable()
export class CriteriaWeightService {
    constructor(
        @InjectRepository(CriteriaWeight)
        private readonly criteriaWeightRepository: Repository<CriteriaWeight>,
    ) {}

    async saveCriteriaWeights(data: any) {
        const created = this.criteriaWeightRepository.create(data);
        return await this.criteriaWeightRepository.save(created);
    }
}
