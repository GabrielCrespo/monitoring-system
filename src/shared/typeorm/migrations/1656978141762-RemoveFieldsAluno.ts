import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveFieldsAluno1656978141762 implements MigrationInterface {
    name = 'RemoveFieldsAluno1656978141762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_a31b7653f92e594f416f4d960dd"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "ativo"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "ehCotista"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "generoId"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "idade"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" ADD "idade" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "generoId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "ehCotista" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "ativo" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_a31b7653f92e594f416f4d960dd" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
