import Gender from "../../../gender/typeorm/entities/Gender";
import Team from "../../../class/typeorm/entities/Team";
import Course from "../../../course/typeorm/entities/Course";
import User from "../../../user/typeorm/entities/User";

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

@Entity("aluno")
class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  matricula: string;

  @Column()
  nome: string;

  @Column("varchar", { nullable: true })
  telefone: string;

  @Column()
  data_de_nascimento: Date;

  @Column("varchar", { nullable: true })
  avatar: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ default: false })
  ehCotista: boolean;

  @Column()
  idade: number;

  @ManyToOne(() => Course, (course) => course.alunos, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  curso: Course;

  @ManyToOne(() => Team, (team) => team.alunos, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  turma: Team;

  @ManyToOne(() => Gender, (genero) => genero.alunos, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  genero: Gender;

  @OneToOne(() => User, (user) => user.aluno, { eager: true })
  @JoinColumn()
  usuario: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
