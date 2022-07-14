import DayOfWeek from "../../../dayofweek/typeorm/entities/DayOfWeek";
import Teacher from "../../../teacher/typeorm/entities/Teacher";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("horario_monitoria")
class MonitoringTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("time")
  hora_inicio: Date;

  @Column("time")
  hora_fim: Date;

  @OneToOne(() => Teacher, (teacher) => teacher.turma)
  professor: Teacher;

  @ManyToOne(() => DayOfWeek, (dayofweek) => dayofweek.horarios_monitoria, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  dia_da_semana: DayOfWeek;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MonitoringTime;
