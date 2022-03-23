import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTeacherUserRelation1648078493272 implements MigrationInterface {
    name = 'CreateTeacherUserRelation1648078493272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_9848d453705adf59ab820fd3e6d"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP COLUMN "funcaoId"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "UQ_492e744e6333071da912c7d651b"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "professor" ADD "usuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "UQ_b146cfa894240d721bfac37d719" UNIQUE ("usuarioId")`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_b146cfa894240d721bfac37d719" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_b146cfa894240d721bfac37d719"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "UQ_b146cfa894240d721bfac37d719"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP COLUMN "usuarioId"`);
        await queryRunner.query(`ALTER TABLE "professor" ADD "senha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "professor" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "UQ_492e744e6333071da912c7d651b" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "professor" ADD "funcaoId" integer`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_9848d453705adf59ab820fd3e6d" FOREIGN KEY ("funcaoId") REFERENCES "funcao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
