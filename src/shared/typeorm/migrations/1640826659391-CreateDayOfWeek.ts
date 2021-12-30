import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDayOfWeek1640826659391 implements MigrationInterface {
    name = 'CreateDayOfWeek1640826659391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dia_da_semana" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_327d28139a0c57cdb0c8ba6c966" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dia_da_semana"`);
    }

}
