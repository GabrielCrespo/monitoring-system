import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAlunoInstrutor1656560761862 implements MigrationInterface {
    name = 'ChangeAlunoInstrutor1656560761862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "UQ_ee5cf311fc53ce3b917b9532a67"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "ehCotista" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "ehCotista"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "senha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "UQ_ee5cf311fc53ce3b917b9532a67" UNIQUE ("email")`);
    }

}
