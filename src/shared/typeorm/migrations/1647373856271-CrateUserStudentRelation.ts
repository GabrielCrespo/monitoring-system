import {MigrationInterface, QueryRunner} from "typeorm";

export class CrateUserStudentRelation1647373856271 implements MigrationInterface {
    name = 'CrateUserStudentRelation1647373856271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" ADD "usuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "UQ_8fbcdd66cfdb4304b8764d97e83" UNIQUE ("usuarioId")`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "UQ_8fbcdd66cfdb4304b8764d97e83"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "usuarioId"`);
    }

}
