import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import Course from "../../../modules/course/typeorm/entities/Course";
import Gender from "../../../modules/gender/typeorm/entities/Gender";
import Quota from "../../../modules/quota/typeorm/entities/Quota";
import DayOfWeek from "../../../modules/dayofweek/typeorm/entities/DayOfWeek";
import UserType from "../../../modules/user_type/typeorm/entities/UserType";
import Team from "../../../modules/class/typeorm/entities/Team";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Course)
      .values([
        { descricao: "Ciência da Computação" },
        { descricao: "Computação" },
        { descricao: "Engenharia da Computação" },
        { descricao: "Outro" },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Gender)
      .values([
        { descricao: "Masculino" },
        { descricao: "Feminino" },
        { descricao: "Outro" },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Quota)
      .values([
        { descricao: "Sim, Cota Social (Escola Pública)" },
        { descricao: "Sim, Cota Social (Escola Publica - Baixa Renda)" },
        { descricao: "Sim, Cota Social (Escola Publica - PPI)" },
        { descricao: "Sim, Alta Renda PPI" },
        { descricao: "Não, Sistema Universal" },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(DayOfWeek)
      .values([
        { descricao: "Domingo" },
        { descricao: "Segunda-Feira" },
        { descricao: "Terça-Feira" },
        { descricao: "Quarta-Feira" },
        { descricao: "Quinta-Feira" },
        { descricao: "Sexta-Feira" },
        { descricao: "Sábado" },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(UserType)
      .values([
        { descricao: "Aluno" },
        { descricao: "Professor" },
        { descricao: "Monitor" },
        { descricao: "Tutor" },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Team)
      .values([
        {
          descricao: "A",
          hora_inicio: new Date("1901-01-01T14:00:00"),
          hora_fim: new Date("1901-01-01T16:00:00"),
        },
        {
          descricao: "B",
          hora_inicio: new Date("1901-01-01T14:00:00"),
          hora_fim: new Date("1901-01-01T16:00:00"),
        },
        {
          descricao: "C",
          hora_inicio: new Date("1901-01-01T14:00:00"),
          hora_fim: new Date("1901-01-01T16:00:00"),
        },
        {
          descricao: "D",
          hora_inicio: new Date("1901-01-01T14:00:00"),
          hora_fim: new Date("1901-01-01T16:00:00"),
        },
      ])
      .execute();
  }
}
