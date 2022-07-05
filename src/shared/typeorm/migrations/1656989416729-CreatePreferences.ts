import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePreferences1656989416729 implements MigrationInterface {
    name = 'CreatePreferences1656989416729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "preferencia" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cursoId" integer, "generoId" integer, "cotaId" integer, CONSTRAINT "PK_fed3586fce01f20dacfa4729fd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD "preferenciaId" integer`);
        await queryRunner.query(`ALTER TABLE "preferencia" ADD CONSTRAINT "FK_9499dfa51487465dbc5b4f668a5" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "preferencia" ADD CONSTRAINT "FK_ab81697ca7bd55ba420691939b3" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "preferencia" ADD CONSTRAINT "FK_984ed32695ccec0478e450aeec2" FOREIGN KEY ("cotaId") REFERENCES "cota"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aluno" ADD CONSTRAINT "FK_a37dcc14b01b567859a6f17f8a4" FOREIGN KEY ("preferenciaId") REFERENCES "preferencia"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aluno" DROP CONSTRAINT "FK_a37dcc14b01b567859a6f17f8a4"`);
        await queryRunner.query(`ALTER TABLE "preferencia" DROP CONSTRAINT "FK_984ed32695ccec0478e450aeec2"`);
        await queryRunner.query(`ALTER TABLE "preferencia" DROP CONSTRAINT "FK_ab81697ca7bd55ba420691939b3"`);
        await queryRunner.query(`ALTER TABLE "preferencia" DROP CONSTRAINT "FK_9499dfa51487465dbc5b4f668a5"`);
        await queryRunner.query(`ALTER TABLE "aluno" DROP COLUMN "preferenciaId"`);
        await queryRunner.query(`DROP TABLE "preferencia"`);
    }

}
