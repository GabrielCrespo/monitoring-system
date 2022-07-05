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

@Entity("cota")
class Quota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  descricao: string;

  @OneToMany(
    () => StudentInstructor,
    (studentInstructor) => studentInstructor.cota
  )
  alunos_instrutores: StudentInstructor[];

  @OneToMany(() => Preference, (preference) => preference.curso)
  preferences: Preference[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Quota;
