import { EntityRepository, Repository } from "typeorm";
import Class from "../entities/Class";

interface IDayOfWeek {
  descricao: string;
}

interface IRequest {
  descricao: string;
  hora_inicio: Date;
  hora_fim: Date;
  dias_da_semana: IDayOfWeek[];
}
 
@EntityRepository(Class)
class ClassRepository extends Repository<Class> {
  public async findById(id: number): Promise<Class | undefined> {
    const team = await this.findOne(id);
    return team;
  }

  public async findByDescription(
    descricao: string
  ): Promise<Class | undefined> {
    const team = await this.findOne({
      where: {
        descricao,
      },
    });

    return team;
  }

  public async createClass({
    descricao,
    hora_inicio,
    hora_fim,
    dias_da_semana,
  }: IRequest): Promise<Class> {
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

export default ClassRepository;
