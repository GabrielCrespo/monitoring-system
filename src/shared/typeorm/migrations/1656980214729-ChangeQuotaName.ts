import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeQuotaName1656980214729 implements MigrationInterface {
    name = 'ChangeQuotaName1656980214729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_40c532a6504246eadb461dd61bc"`);
        await queryRunner.query(`CREATE TABLE "cota" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_89ec308ed451d08ea92c72f7651" UNIQUE ("descricao"), CONSTRAINT "PK_75e4e015873c7ab030aa4aa3e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_40c532a6504246eadb461dd61bc" FOREIGN KEY ("cotaId") REFERENCES "cota"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_40c532a6504246eadb461dd61bc"`);
        await queryRunner.query(`DROP TABLE "cota"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_40c532a6504246eadb461dd61bc" FOREIGN KEY ("cotaId") REFERENCES "cotas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
