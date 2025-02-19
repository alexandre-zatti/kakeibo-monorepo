import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../shared/entities/auditable.entity';
import { Purchase } from '../purchase/purchase.entity';

@Entity()
export class Product extends AuditableEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @Column({ type: 'varchar', length: 255, name: 'code' })
  code: string;

  @Column({ type: 'varchar', length: 255, name: 'description' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'unit_value' })
  unitValue: number;

  @Column({ type: 'varchar', length: 10, name: 'unit_identifier' })
  unitIdentifier: string;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_value' })
  totalValue: number;
}
