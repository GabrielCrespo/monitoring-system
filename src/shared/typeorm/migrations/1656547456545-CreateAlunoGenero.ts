import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAlunoGenero1656547456545 implements MigrationInterface {
    name = 'CreateAlunoGenero1656547456545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genero" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_681c2c8d602304f33f9cc74e6ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "telefone" character varying`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "ehCotista" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "generoId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_a31b7653f92e594f416f4d960dd" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_a31b7653f92e594f416f4d960dd"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "generoId"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "ehCotista"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "telefone"`);
        await queryRunner.query(`DROP TABLE "genero"`);
    }

}
