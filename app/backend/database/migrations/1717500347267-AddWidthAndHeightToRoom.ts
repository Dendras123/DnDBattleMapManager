import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWidthAndHeightToRoom1717500347267
  implements MigrationInterface
{
  name = 'AddWidthAndHeightToRoom1717500347267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_room" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL DEFAULT ('Unnamed Map'), "width" integer NOT NULL DEFAULT (1600), "height" integer NOT NULL DEFAULT (900))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_room"("id", "name") SELECT "id", "name" FROM "room"`,
    );
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`ALTER TABLE "temporary_room" RENAME TO "room"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "room" RENAME TO "temporary_room"`);
    await queryRunner.query(
      `CREATE TABLE "room" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL DEFAULT ('Unnamed Map'))`,
    );
    await queryRunner.query(
      `INSERT INTO "room"("id", "name") SELECT "id", "name" FROM "temporary_room"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_room"`);
  }
}
