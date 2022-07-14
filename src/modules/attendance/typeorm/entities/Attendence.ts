import StudentInstructor from "../../../student_instructor/typeorm/entities/StudentInstructor";
import Student from "../../../student/typeorm/entities/Student";
import DayOfWeek from "../../../dayofweek/typeorm/entities/DayOfWeek";

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("atendimento")
class Attendence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  status: boolean;

  @Column("text")
  observacao: string;

  @ManyToOne(() => Student, (student) => student.alunos, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  aluno: Student;

  @ManyToOne(
    () => StudentInstructor,
    (studentInstructor) => studentInstructor.alunos_instrutores,
    {
      eager: true,
      cascade: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }
  )
  aluno_instrutor: StudentInstructor;

  @ManyToOne(() => DayOfWeek, (dayOfweek) => dayOfweek.dias_da_semana, {
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

export default Attendence;
