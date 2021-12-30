import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRelationClassDayOfWeek1640834112684 implements MigrationInterface {
    name = 'CreateRelationClassDayOfWeek1640834112684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "turma_dias_da_semana_dia_da_semana" ("turmaId" integer NOT NULL, "diaDaSemanaId" integer NOT NULL, CONSTRAINT "PK_447287a2013d864e6764601661a" PRIMARY KEY ("turmaId", "diaDaSemanaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f6cfb340e882f2ecb95ff64f2" ON "turma_dias_da_semana_dia_da_semana" ("turmaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_675497e48b8720d21cdfa81582" ON "turma_dias_da_semana_dia_da_semana" ("diaDaSemanaId") `);
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana_dia_da_semana" ADD CONSTRAINT "FK_6f6cfb340e882f2ecb95ff64f24" FOREIGN KEY ("turmaId") REFERENCES "turma"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana_dia_da_semana" ADD CONSTRAINT "FK_675497e48b8720d21cdfa815823" FOREIGN KEY ("diaDaSemanaId") REFERENCES "dia_da_semana"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana_dia_da_semana" DROP CONSTRAINT "FK_675497e48b8720d21cdfa815823"`);
        await queryRunner.query(`ALTER TABLE "turma_dias_da_semana_dia_da_semana" DROP CONSTRAINT "FK_6f6cfb340e882f2ecb95ff64f24"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_675497e48b8720d21cdfa81582"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f6cfb340e882f2ecb95ff64f2"`);
        await queryRunner.query(`DROP TABLE "turma_dias_da_semana_dia_da_semana"`);
    }

}
