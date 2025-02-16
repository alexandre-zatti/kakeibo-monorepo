import { MigrationInterface, QueryRunner } from 'typeorm';

export class PurchaseCreate1739735103358 implements MigrationInterface {
  name = 'PurchaseCreate1739735103358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "purchase"
                             (
                                 "id"          integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "status"      integer        NOT NULL,
                                 "total_value" decimal(10, 2) NOT NULL,
                                 "bought_at"   datetime       NOT NULL,
                                 "created_at"  datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                                 "updated_at"  datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP)
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "purchase"`);
  }
}
