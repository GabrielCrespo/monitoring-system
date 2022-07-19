import DayOfWeek from "../../../dayofweek/typeorm/entities/DayOfWeek";
import Teacher from "../../../teacher/typeorm/entities/Teacher";
import StudentInstructor from "../../../student_instructor/typeorm/entities/StudentInstructor";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(
    () => StudentInstructor,
    (instructor) => instructor.horarios_monitoria
  )
  alunos_monitores: StudentInstructor[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MonitoringTime;
