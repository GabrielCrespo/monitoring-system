import { EntityRepository, Repository } from "typeorm";
import Team from "../entities/Team";

interface IDayOfWeek {
  descricao: string;
}

interface IRequest {
  descricao: string;
  hora_inicio: Date;
  hora_fim: Date;
  dias_da_semana: IDayOfWeek[];
}
 
@EntityRepository(Team)
class TeamRepository extends Repository<Team> {
  public async findById(id: number): Promise<Team | undefined> {
    const team = await this.findOne(id);
    return team;
  }

  public async findByDescription(
    descricao: string
  ): Promise<Team | undefined> {
    const team = await this.findOne({
      where: {
        descricao,
      },
    });

    return team;
  }

  public async createTeam({
    descricao,
    hora_inicio,
    hora_fim,
    dias_da_semana,
  }: IRequest): Promise<Team> {
    const team = this.create({
      descricao,
      hora_inicio,
      hora_fim,
      dias_da_semana,
    });
    await this.save(team);

    return team;
  }
}

export default TeamRepository;
