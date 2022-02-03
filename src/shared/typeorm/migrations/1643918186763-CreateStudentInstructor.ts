import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStudentInstructor1643918186763 implements MigrationInterface {
    name = 'CreateStudentInstructor1643918186763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aluno_instrutor" ("id" SERIAL NOT NULL, "matricula" character varying NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "data_de_nascimento" TIMESTAMP NOT NULL, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tipoAlunoInstrutorId" integer, "cursoId" integer, "funcaoId" integer, CONSTRAINT "UQ_fa691af071883423cab01032882" UNIQUE ("matricula"), CONSTRAINT "UQ_ee5cf311fc53ce3b917b9532a67" UNIQUE ("email"), CONSTRAINT "PK_3e372b614d180b7ef8687497106" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_d92c8144ce7f0076572e900d642" FOREIGN KEY ("tipoAlunoInstrutorId") REFERENCES "tipo_aluno_instrutor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_852f4d32ed72705d5b4098a3ea7" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_a5848ec1aac7b688a9c79f7ef75" FOREIGN KEY ("funcaoId") REFERENCES "funcao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_a5848ec1aac7b688a9c79f7ef75"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_852f4d32ed72705d5b4098a3ea7"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_d92c8144ce7f0076572e900d642"`);
        await queryRunner.query(`DROP TABLE "aluno_instrutor"`);
    }

}
