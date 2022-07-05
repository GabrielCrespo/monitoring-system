import Course from "../../../course/typeorm/entities/Course";
import Gender from "../../../gender/typeorm/entities/Gender";
import User from "../../../user/typeorm/entities/User";
import Quota from "../../../quota/typeorm/entities/Quota";

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("aluno_instrutor")
class StudentInstructor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  matricula: string;

  @Column()
  nome: string;

  @Column()
  data_de_nascimento: Date;

  @Column("varchar", { nullable: true })
  telefone: string;

  @Column({ nullable: true })
  tipo_instrutor: string;

  @Column("varchar", { nullable: true })
  avatar: string;

  @ManyToOne(() => Gender, (genero) => genero.instrutores, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  genero: Gender;

  @ManyToOne(() => Course, (course) => course.alunos_instrutores, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  curso: Course;

  @ManyToOne(() => Quota, (quota) => quota.alunos_instrutores, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  cota: Quota;

  @OneToOne(() => User, (user) => user.aluno, { eager: true })
  @JoinColumn()
  usuario: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StudentInstructor;
