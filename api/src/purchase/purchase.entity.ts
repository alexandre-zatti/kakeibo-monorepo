import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Auditable } from '../auditable.entity';

@Entity()
export class Purchase extends Auditable {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_value' })
  totalValue: number;

  @Column({ type: 'datetime', name: 'bought_at' })
  boughtAt: Date;
}
