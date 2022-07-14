import {MigrationInterface, QueryRunner} from "typeorm";

export class m11657770136702 implements MigrationInterface {
    name = 'm11657770136702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_usuario" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f96a6ccf51116096e376218bd0" UNIQUE ("descricao"), CONSTRAINT "PK_2abd2759a18236cbf357c06dea0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "eh_admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tipoUsuarioId" integer, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professor" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "avatar" character varying, "ativo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "turmaId" integer, "usuarioId" integer, CONSTRAINT "REL_358cc17587cbf26c1894f2dc15" UNIQUE ("turmaId"), CONSTRAINT "REL_b146cfa894240d721bfac37d71" UNIQUE ("usuarioId"), CONSTRAINT "PK_39a6c8f16280dc3bc3ffdc41e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "horario_monitoria" ("id" SERIAL NOT NULL, "hora_inicio" TIME NOT NULL, "hora_fim" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "diaDaSemanaId" integer, CONSTRAINT "PK_bc70a502b0a6efee1b8c38848cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dia_da_semana" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_327d28139a0c57cdb0c8ba6c966" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "turma" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "hora_inicio" TIME NOT NULL, "hora_fim" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b7da8685b4c588d7bb0c3b30930" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genero" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_681c2c8d602304f33f9cc74e6ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cota" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_89ec308ed451d08ea92c72f7651" UNIQUE ("descricao"), CONSTRAINT "PK_75e4e015873c7ab030aa4aa3e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "preferencia" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cursoId" integer, "generoId" integer, "cotaId" integer, CONSTRAINT "PK_fed3586fce01f20dacfa4729fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aluno" ("id" SERIAL NOT NULL, "matricula" character varying NOT NULL, "nome" character varying NOT NULL, "telefone" character varying, "data_de_nascimento" TIMESTAMP NOT NULL, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cursoId" integer, "turmaId" integer, "preferenciaId" integer, "usuarioId" integer, CONSTRAINT "UQ_d361bd841d0658620d4a3d2ff6a" UNIQUE ("matricula"), CONSTRAINT "REL_8fbcdd66cfdb4304b8764d97e8" UNIQUE ("usuarioId"), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "curso" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_76073a915621326fb85f28ecc5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aluno_instrutor" ("id" SERIAL NOT NULL, "matricula" character varying NOT NULL, "nome" character varying NOT NULL, "data_de_nascimento" TIMESTAMP NOT NULL, "telefone" character varying, "tipo_instrutor" character varying, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "generoId" integer, "cursoId" integer, "cotaId" integer, "usuarioId" integer, CONSTRAINT "UQ_fa691af071883423cab01032882" UNIQUE ("matricula"), CONSTRAINT "REL_443e171002fe8415a0917080e3" UNIQUE ("usuarioId"), CONSTRAINT "PK_3e372b614d180b7ef8687497106" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "atendimento" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "status" boolean NOT NULL, "observacao" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "alunoId" integer, "alunoInstrutorId" integer, "diaDaSemanaId" integer, CONSTRAINT "PK_ad65f895dac5fe2b905001750c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "turma_dias_da_semana" ("turmaId" integer NOT NULL, "diaDaSemanaId" integer NOT NULL, CONSTRAINT "PK_715b58d1735d242212a4b1775a6" PRIMARY KEY ("turmaId", "diaDaSemanaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca0bb60fa7cfb96d7fb7fda1b8" ON "turma_dias_da_semana" ("turmaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_92cbbb9162515e4360d4318c1f" ON "turma_dias_da_semana" ("diaDaSemanaId") `);
        await queryRunner.query(`CREATE TABLE "instrutor_horario_monitoria" ("alunoInstrutorId" integer NOT NULL, "horarioMonitoriaId" integer NOT NULL, CONSTRAINT "PK_5f7612638a0253cc2fbbb34c3cc" PRIMARY KEY ("alunoInstrutorId", "horarioMonitoriaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9752a30d36dafffee358e6f009" ON "instrutor_horario_monitoria" ("alunoInstrutorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2202a6ebe579840342ce270436" ON "instrutor_horario_monitoria" ("horarioMonitoriaId") `);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_839a74b9952fd140d2c957e9e44" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tipo_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_358cc17587cbf26c1894f2dc15b" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professor" ADD CONSTRAINT "FK_b146cfa894240d721bfac37d719" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "horario_monitoria" ADD CONSTRAINT "FK_52e426a0ec929ecf316fcd4420a" FOREIGN KEY ("diaDaSemanaId") REFERENCES "dia_da_semana"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "preferencia" ADD CONSTRAINT "FK_9499dfa51487465dbc5b4f668a5" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "preferencia" ADD CONSTRAINT "FK_ab81697ca7bd55ba420691939b3" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "preferencia" ADD CONSTRAINT "FK_984ed32695ccec0478e450aeec2" FOREIGN KEY ("cotaId") REFERENCES "cota"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_78a69c2e65e9c3fd20f1a9ce727" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_89e61a6bd53e81c3241086cd47c" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_a37dcc14b01b567859a6f17f8a4" FOREIGN KEY ("preferenciaId") REFERENCES "preferencia"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_a8e23186deb9cd5bbee4537ce64" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_852f4d32ed72705d5b4098a3ea7" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_40c532a6504246eadb461dd61bc" FOREIGN KEY ("cotaId") REFERENCES "cota"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" ADD CONSTRAINT "FK_443e171002fe8415a0917080e32" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atendimento" ADD CONSTRAINT "FK_38dd25071dbfbd4c19959930298" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "atendimento" ADD CONSTRAINT "FK_0279cec59e4bf6cf4fb162ad774" FOREIGN KEY ("alunoInstrutorId") REFERENCES "aluno_instrutor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "atendimento" ADD CONSTRAINT "FK_75a5b4b5576721cc476f8e85622" FOREIGN KEY ("diaDaSemanaId") REFERENCES "dia_da_semana"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana" ADD CONSTRAINT "FK_ca0bb60fa7cfb96d7fb7fda1b8b" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana" ADD CONSTRAINT "FK_92cbbb9162515e4360d4318c1fc" FOREIGN KEY ("diaDaSemanaId") REFERENCES "dia_da_semana"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "instrutor_horario_monitoria" ADD CONSTRAINT "FK_9752a30d36dafffee358e6f0094" FOREIGN KEY ("alunoInstrutorId") REFERENCES "aluno_instrutor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "instrutor_horario_monitoria" ADD CONSTRAINT "FK_2202a6ebe579840342ce2704368" FOREIGN KEY ("horarioMonitoriaId") REFERENCES "horario_monitoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instrutor_horario_monitoria" DROP CONSTRAINT "FK_2202a6ebe579840342ce2704368"`);
        await queryRunner.query(`ALTER TABLE "instrutor_horario_monitoria" DROP CONSTRAINT "FK_9752a30d36dafffee358e6f0094"`);
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana" DROP CONSTRAINT "FK_92cbbb9162515e4360d4318c1fc"`);
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana" DROP CONSTRAINT "FK_ca0bb60fa7cfb96d7fb7fda1b8b"`);
        await queryRunner.query(`ALTER TABLE "atendimento" DROP CONSTRAINT "FK_75a5b4b5576721cc476f8e85622"`);
        await queryRunner.query(`ALTER TABLE "atendimento" DROP CONSTRAINT "FK_0279cec59e4bf6cf4fb162ad774"`);
        await queryRunner.query(`ALTER TABLE "atendimento" DROP CONSTRAINT "FK_38dd25071dbfbd4c19959930298"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_443e171002fe8415a0917080e32"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_40c532a6504246eadb461dd61bc"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_852f4d32ed72705d5b4098a3ea7"`);
        await queryRunner.query(`ALTER TABLE "aluno_instrutor" DROP CONSTRAINT "FK_a8e23186deb9cd5bbee4537ce64"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_8fbcdd66cfdb4304b8764d97e83"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_a37dcc14b01b567859a6f17f8a4"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_89e61a6bd53e81c3241086cd47c"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_78a69c2e65e9c3fd20f1a9ce727"`);
        await queryRunner.query(`ALTER TABLE "preferencia" DROP CONSTRAINT "FK_984ed32695ccec0478e450aeec2"`);
        await queryRunner.query(`ALTER TABLE "preferencia" DROP CONSTRAINT "FK_ab81697ca7bd55ba420691939b3"`);
        await queryRunner.query(`ALTER TABLE "preferencia" DROP CONSTRAINT "FK_9499dfa51487465dbc5b4f668a5"`);
        await queryRunner.query(`ALTER TABLE "horario_monitoria" DROP CONSTRAINT "FK_52e426a0ec929ecf316fcd4420a"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_b146cfa894240d721bfac37d719"`);
        await queryRunner.query(`ALTER TABLE "professor" DROP CONSTRAINT "FK_358cc17587cbf26c1894f2dc15b"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_839a74b9952fd140d2c957e9e44"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2202a6ebe579840342ce270436"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9752a30d36dafffee358e6f009"`);
        await queryRunner.query(`DROP TABLE "instrutor_horario_monitoria"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92cbbb9162515e4360d4318c1f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca0bb60fa7cfb96d7fb7fda1b8"`);
        await queryRunner.query(`DROP TABLE "turma_dias_da_semana"`);
        await queryRunner.query(`DROP TABLE "atendimento"`);
        await queryRunner.query(`DROP TABLE "aluno_instrutor"`);
        await queryRunner.query(`DROP TABLE "curso"`);
        await queryRunner.query(`DROP TABLE "aluno"`);
        await queryRunner.query(`DROP TABLE "preferencia"`);
        await queryRunner.query(`DROP TABLE "cota"`);
        await queryRunner.query(`DROP TABLE "genero"`);
        await queryRunner.query(`DROP TABLE "turma"`);
        await queryRunner.query(`DROP TABLE "dia_da_semana"`);
        await queryRunner.query(`DROP TABLE "horario_monitoria"`);
        await queryRunner.query(`DROP TABLE "professor"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "tipo_usuario"`);
    }

}
