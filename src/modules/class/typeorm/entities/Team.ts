import DayOfWeek from "../../../dayofweek/typeorm/entities/DayOfWeek";
import Teacher from "../../../teacher/typeorm/entities/Teacher";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Student from "../../../student/typeorm/entities/Student";

@Entity("turma")
class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column("time")
  hora_inicio: Date;

  @Column("time")
  hora_fim: Date;

  @OneToOne(() => Teacher, (teacher) => teacher.turma)
  professor: Teacher;

  @OneToMany(() => Student, (student) => student.curso)
  alunos: Student[];

  @ManyToMany(() => DayOfWeek, { eager: true })
  @JoinTable()
  dias_da_semana: DayOfWeek[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Team;
