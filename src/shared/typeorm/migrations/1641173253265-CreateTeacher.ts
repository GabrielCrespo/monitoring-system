import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTeacher1641173253265 implements MigrationInterface {
    name = 'CreateTeacher1641173253265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professor" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "avatar" character varying, "ativo" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "funcaoId" integer, "turmaId" integer, CONSTRAINT "UQ_492e744e6333071da912c7d651b" UNIQUE ("email"), CONSTRAINT "REL_358cc17587cbf26c1894f2dc15" UNIQUE ("turmaId"), CONSTRAINT "PK_39a6c8f16280dc3bc3ffdc41e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_9848d453705adf59ab820fd3e6d" FOREIGN KEY ("funcaoId") REFERENCES "funcao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_358cc17587cbf26c1894f2dc15b" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_358cc17587cbf26c1894f2dc15b"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_9848d453705adf59ab820fd3e6d"`);
        await queryRunner.query(`DROP TABLE "professor"`);
    }

}
