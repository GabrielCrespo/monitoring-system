import StudentInstructor from "../../../student_instructor/typeorm/entities/StudentInstructor";
import Preference from "../../../preference/typeorm/entities/Preference";

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("genero")
class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @OneToMany(() => StudentInstructor, (instructor) => instructor.genero)
  instrutores: StudentInstructor[];

  @OneToMany(() => Preference, (preference) => preference.curso)
  preferences: Preference[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Gender;
