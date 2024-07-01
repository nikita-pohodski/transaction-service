import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTransaction1719829501937 implements MigrationInterface {
  name = 'InitTransaction1719829501937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_type_enum" AS ENUM('WITHDRAWAL', 'DEPOSIT', 'TRANSFER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("transaction_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "amount" character varying NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id")); COMMENT ON COLUMN "transaction"."transaction_id" IS 'Transaction ID'; COMMENT ON COLUMN "transaction"."userId" IS 'ID of the user who makes the transaction'; COMMENT ON COLUMN "transaction"."amount" IS 'Amount of transaction in cents'; COMMENT ON COLUMN "transaction"."type" IS 'Transaction type'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
  }
}
