import DayOfWeek from "../../../dayofweek/typeorm/entities/DayOfWeek";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity("turma")
class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column("time")
  hora_inicio: Date;

  @Column("time")
  hora_fim: Date;

  @ManyToMany(() => DayOfWeek, {eager: true})
  @JoinTable()
  dias_da_semana: DayOfWeek[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Class;
