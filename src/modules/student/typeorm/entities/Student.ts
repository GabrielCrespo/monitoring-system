import Team from "../../../class/typeorm/entities/Team";
import Course from "../../../course/typeorm/entities/Course";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @Column("varchar", { unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  data_de_nascimento: Date;

  @Column("varchar", { nullable: true })
  avatar: string;

  @Column({ default: true })
  ativo: boolean;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
