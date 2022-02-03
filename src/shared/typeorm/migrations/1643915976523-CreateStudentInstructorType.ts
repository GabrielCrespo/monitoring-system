import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStudentInstructorType1643915976523 implements MigrationInterface {
    name = 'CreateStudentInstructorType1643915976523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_aluno_instrutor" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_98a2b7b573c794a979c7c38c78d" UNIQUE ("descricao"), CONSTRAINT "PK_17139c25509206fdd2655e6906b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipo_aluno_instrutor"`);
    }

}
