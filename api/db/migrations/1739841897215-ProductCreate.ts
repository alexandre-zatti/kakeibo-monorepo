import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCreate1739841897215 implements MigrationInterface {
  name = 'ProductCreate1739841897215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "product"
                             (
                                 "created_at"      datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                                 "updated_at"      datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                                 "id"              integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "code"            varchar(255)   NOT NULL,
                                 "description"     varchar(255)   NOT NULL,
                                 "unit_value"      decimal(10, 2) NOT NULL,
                                 "unit_identifier" integer        NOT NULL,
                                 "quantity"        integer        NOT NULL,
                                 "total_value"     decimal(10, 2) NOT NULL,
                                 "purchase_id"     integer
                             )`);
    await queryRunner.query(`CREATE TABLE "temporary_product"
                             (
                                 "created_at"      datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                                 "updated_at"      datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                                 "id"              integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "code"            varchar(255)   NOT NULL,
                                 "description"     varchar(255)   NOT NULL,
                                 "unit_value"      decimal(10, 2) NOT NULL,
                                 "unit_identifier" integer        NOT NULL,
                                 "quantity"        integer        NOT NULL,
                                 "total_value"     decimal(10, 2) NOT NULL,
                                 "purchase_id"     integer,
                                 CONSTRAINT "FK_d98054783965848700d289b14fc" FOREIGN KEY ("purchase_id") REFERENCES "purchase" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
                             )`);
    await queryRunner.query(`INSERT INTO "temporary_product"("created_at",
                                                             "updated_at", "id",
                                                             "code",
                                                             "description",
                                                             "unit_value",
                                                             "unit_identifier",
                                                             "quantity",
                                                             "total_value",
                                                             "purchase_id")
                             SELECT "created_at",
                                    "updated_at",
                                    "id",
                                    "code",
                                    "description",
                                    "unit_value",
                                    "unit_identifier",
                                    "quantity",
                                    "total_value",
                                    "purchase_id"
                             FROM "product"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_product" RENAME TO "product"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
    );
    await queryRunner.query(`CREATE TABLE "product"
                             (
                                 "created_at"      datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                                 "updated_at"      datetime       NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                                 "id"              integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "code"            varchar(255)   NOT NULL,
                                 "description"     varchar(255)   NOT NULL,
                                 "unit_value"      decimal(10, 2) NOT NULL,
                                 "unit_identifier" integer        NOT NULL,
                                 "quantity"        integer        NOT NULL,
                                 "total_value"     decimal(10, 2) NOT NULL,
                                 "purchase_id"     integer
                             )`);
    await queryRunner.query(`INSERT INTO "product"("created_at", "updated_at",
                                                   "id", "code", "description",
                                                   "unit_value",
                                                   "unit_identifier",
                                                   "quantity", "total_value",
                                                   "purchase_id")
                             SELECT "created_at",
                                    "updated_at",
                                    "id",
                                    "code",
                                    "description",
                                    "unit_value",
                                    "unit_identifier",
                                    "quantity",
                                    "total_value",
                                    "purchase_id"
                             FROM "temporary_product"`);
    await queryRunner.query(`DROP TABLE "temporary_product"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
