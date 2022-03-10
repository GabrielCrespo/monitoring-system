import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserAndUserTypeRelation1646871540457 implements MigrationInterface {
    name = 'CreateUserAndUserTypeRelation1646871540457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "eh_admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tipoUsuarioId" integer, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tipo_usuario" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f96a6ccf51116096e376218bd0" UNIQUE ("descricao"), CONSTRAINT "PK_2abd2759a18236cbf357c06dea0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_839a74b9952fd140d2c957e9e44" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tipo_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_839a74b9952fd140d2c957e9e44"`);
        await queryRunner.query(`DROP TABLE "tipo_usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
