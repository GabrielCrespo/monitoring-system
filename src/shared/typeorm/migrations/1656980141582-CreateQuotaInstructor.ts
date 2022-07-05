import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateQuotaInstructor1656980141582 implements MigrationInterface {
    name = 'CreateQuotaInstructor1656980141582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cotas" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_766d7aa1ebe52addcdc20ad8c63" UNIQUE ("descricao"), CONSTRAINT "PK_e7578663e266cb12d3d85f251d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "cotaId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_40c532a6504246eadb461dd61bc" FOREIGN KEY ("cotaId") REFERENCES "cotas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_40c532a6504246eadb461dd61bc"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "cotaId"`);
        await queryRunner.query(`DROP TABLE "cotas"`);
    }

}
