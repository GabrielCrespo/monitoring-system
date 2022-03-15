import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveStudentEmailAndPassword1647375003175 implements MigrationInterface {
    name = 'RemoveStudentEmailAndPassword1647375003175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "UQ_29a948302c3a739d7b20773e182"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "senha"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" ADD "senha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "UQ_29a948302c3a739d7b20773e182" UNIQUE ("email")`);
    }

}
