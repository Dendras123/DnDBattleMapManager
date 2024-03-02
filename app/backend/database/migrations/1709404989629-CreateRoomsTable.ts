import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoomsTable1709404989629 implements MigrationInterface {
  name = 'CreateRoomsTable1709404989629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL DEFAULT ('Unnamed Map'))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "room"`);
  }
}
