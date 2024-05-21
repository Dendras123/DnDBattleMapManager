import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoomToImage1716310709048 implements MigrationInterface {
  name = 'AddRoomToImage1716310709048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "extension" varchar(5) NOT NULL, "position" text, "scale" double NOT NULL DEFAULT (1), "hidden" boolean NOT NULL DEFAULT (0), "roomId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_image"("id", "name", "extension", "position", "scale", "hidden") SELECT "id", "name", "extension", "position", "scale", "hidden" FROM "image"`,
    );
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "extension" varchar(5) NOT NULL, "position" text, "scale" double NOT NULL DEFAULT (1), "hidden" boolean NOT NULL DEFAULT (0), "roomId" varchar, CONSTRAINT "FK_a3867b438b2d9e864d20c6e908e" FOREIGN KEY ("roomId") REFERENCES "room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_image"("id", "name", "extension", "position", "scale", "hidden", "roomId") SELECT "id", "name", "extension", "position", "scale", "hidden", "roomId" FROM "image"`,
    );
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
    await queryRunner.query(
      `CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "extension" varchar(5) NOT NULL, "position" text, "scale" double NOT NULL DEFAULT (1), "hidden" boolean NOT NULL DEFAULT (0), "roomId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "image"("id", "name", "extension", "position", "scale", "hidden", "roomId") SELECT "id", "name", "extension", "position", "scale", "hidden", "roomId" FROM "temporary_image"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_image"`);
    await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
    await queryRunner.query(
      `CREATE TABLE "image" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "extension" varchar(5) NOT NULL, "position" text, "scale" double NOT NULL DEFAULT (1), "hidden" boolean NOT NULL DEFAULT (0))`,
    );
    await queryRunner.query(
      `INSERT INTO "image"("id", "name", "extension", "position", "scale", "hidden") SELECT "id", "name", "extension", "position", "scale", "hidden" FROM "temporary_image"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_image"`);
  }
}
