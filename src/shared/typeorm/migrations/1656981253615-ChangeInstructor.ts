import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeInstructor1656981253615 implements MigrationInterface {
    name = 'ChangeInstructor1656981253615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "ehCotista"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "idade"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "idade" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "ehCotista" boolean NOT NULL DEFAULT false`);
    }

}
