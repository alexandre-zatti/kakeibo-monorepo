import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../shared/entities/auditable.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Purchase extends AuditableEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_value' })
  totalValue: number;

  @Column({ type: 'datetime', name: 'bought_at' })
  boughtAt: Date;

  @OneToMany(() => Product, (product) => product.purchase, { cascade: true })
  products: Product[];
}
