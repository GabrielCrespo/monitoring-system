import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateClass1640834000867 implements MigrationInterface {
    name = 'CreateClass1640834000867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "turma" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "hora_inicio" TIME NOT NULL, "hora_fim" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b7da8685b4c588d7bb0c3b30930" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "turma"`);
    }

}
