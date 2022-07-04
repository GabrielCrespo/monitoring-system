import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAlunoEhCotista1656547546882 implements MigrationInterface {
    name = 'ChangeAlunoEhCotista1656547546882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" ALTER COLUMN "ehCotista" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" ALTER COLUMN "ehCotista" SET DEFAULT true`);
    }

}
