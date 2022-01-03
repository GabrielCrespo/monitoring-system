import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultActiveValueTeacher1641175450769 implements MigrationInterface {
    name = 'AddDefaultActiveValueTeacher1641175450769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professor" ALTER COLUMN "ativo" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professor" ALTER COLUMN "ativo" DROP DEFAULT`);
    }

}
