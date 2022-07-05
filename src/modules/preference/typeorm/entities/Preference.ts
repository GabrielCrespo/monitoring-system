import Course from "../../../course/typeorm/entities/Course";
import Gender from "../../../gender/typeorm/entities/Gender";
import Quota from "../../../quota/typeorm/entities/Quota";
import Student from "../../../student/typeorm/entities/Student";

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("preferencia")
class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.preferences, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  curso: Course;

  @ManyToOne(() => Gender, (gender) => gender.preferences, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  genero: Gender;

  @ManyToOne(() => Quota, (quota) => quota.preferences, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  cota: Quota;

  @OneToMany(() => Student, (student) => student.preferencia)
  alunos: Student[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Preference;
