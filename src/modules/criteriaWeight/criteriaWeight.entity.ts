import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CriteriaWeight {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column('float')
    reliabilityScore: number;

    @Column('float')
    priceScore: number;

    @Column('float')
    deliveryTimeScore: number;

    @Column('float')
    warrantyScore: number;

    @Column('float')
    complianceScore: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timeStamp: Date;
}
