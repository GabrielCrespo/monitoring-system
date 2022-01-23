import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStudent1642898541860 implements MigrationInterface {
    name = 'CreateStudent1642898541860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aluno" ("id" SERIAL NOT NULL, "matricula" character varying NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "data_de_nascimento" TIMESTAMP NOT NULL, "avatar" character varying, "ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cursoId" integer, "turmaId" integer, CONSTRAINT "UQ_d361bd841d0658620d4a3d2ff6a" UNIQUE ("matricula"), CONSTRAINT "UQ_29a948302c3a739d7b20773e182" UNIQUE ("email"), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_78a69c2e65e9c3fd20f1a9ce727" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_89e61a6bd53e81c3241086cd47c" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_89e61a6bd53e81c3241086cd47c"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_78a69c2e65e9c3fd20f1a9ce727"`);
        await queryRunner.query(`DROP TABLE "aluno"`);
    }

}
