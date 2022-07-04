import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeInstrutor1656553773781 implements MigrationInterface {
    name = 'ChangeInstrutor1656553773781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_d92c8144ce7f0076572e900d642"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_a5848ec1aac7b688a9c79f7ef75"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "tipoAlunoInstrutorId"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "funcaoId"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "ehAdmin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "telefone" character varying`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "tipo_instrutor" character varying`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "generoId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "usuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "UQ_443e171002fe8415a0917080e32" UNIQUE ("usuarioId")`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_a8e23186deb9cd5bbee4537ce64" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_443e171002fe8415a0917080e32" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_443e171002fe8415a0917080e32"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_a8e23186deb9cd5bbee4537ce64"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "UQ_443e171002fe8415a0917080e32"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "usuarioId"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "generoId"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "tipo_instrutor"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "telefone"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP COLUMN "ehAdmin"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "funcaoId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD "tipoAlunoInstrutorId" integer`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_a5848ec1aac7b688a9c79f7ef75" FOREIGN KEY ("funcaoId") REFERENCES "funcao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_d92c8144ce7f0076572e900d642" FOREIGN KEY ("tipoAlunoInstrutorId") REFERENCES "tipo_aluno_instrutor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
