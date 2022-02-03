import StudentInstructor from "../../../student_instructor/typeorm/entities/StudentInstructor";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tipo_aluno_instrutor")
class StudentInstructorType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  descricao: string;

  @OneToMany(
    () => StudentInstructor,
    (studentInstructor) => studentInstructor.funcao
  )
  alunos_instrutores: StudentInstructor[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StudentInstructorType;
