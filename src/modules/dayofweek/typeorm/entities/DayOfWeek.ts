import MonitoringTime from "../../../monitoring_time/typeorm/entities/MonitoringTime";
import Attendence from "../../../attendance/typeorm/entities/Attendence";

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("dia_da_semana")
class DayOfWeek {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @OneToMany(
    () => MonitoringTime,
    (monitoringTime) => monitoringTime.dia_da_semana
  )
  horarios_monitoria: MonitoringTime[];

  @OneToMany(() => Attendence, (attendance) => attendance.aluno)
  dias_da_semana: Attendence[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DayOfWeek;
