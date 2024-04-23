import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImagesTable1712076969210 implements MigrationInterface {
  name = 'CreateImagesTable1712076969210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "extension" varchar(5) NOT NULL, "position" text, "scale" double NOT NULL DEFAULT (1), "hidden" boolean NOT NULL DEFAULT (0))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
