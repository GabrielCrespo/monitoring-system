import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Teacher from "../../../teacher/typeorm/entities/Teacher";
import StudentInstructor from "../../../student_instructor/typeorm/entities/StudentInstructor";

@Entity("funcao")
class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @OneToMany(() => Teacher, (teacher) => teacher.funcao)
  professor: Teacher[];

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

export default Role;
