import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIdade1656947997966 implements MigrationInterface {
    name = 'AddIdade1656947997966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" RENAME COLUMN "ehAdmin" TO "idade"`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "idade" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "idade"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "idade" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "idade"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "idade" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "idade"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" RENAME COLUMN "idade" TO "ehAdmin"`);
    }

}
