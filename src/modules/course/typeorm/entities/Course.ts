import StudentInstructor from "../../../student_instructor/typeorm/entities/StudentInstructor";
import Student from "../../../student/typeorm/entities/Student";
import Preference from "../../../preference/typeorm/entities/Preference";

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("curso")
class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @OneToMany(() => Student, (student) => student.curso)
  alunos: Student[];

  @OneToMany(
    () => StudentInstructor,
    (studentInstructor) => studentInstructor.curso
  )
  alunos_instrutores: StudentInstructor[];

  @OneToMany(() => Preference, (preference) => preference.curso)
  preferences: Preference[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Course;
