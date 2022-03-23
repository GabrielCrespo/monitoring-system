import User from "../../../user/typeorm/entities/User";
import Team from "../../../class/typeorm/entities/Team";
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

@Entity("professor")
class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column("varchar", { nullable: true })
  avatar: string;

  @OneToOne(() => Team, (turma) => turma.professor, { eager: true })
  @JoinColumn()
  turma: Team;

  @OneToOne(() => User, (user) => user.professor, { eager: true })
  @JoinColumn()
  usuario: User;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Teacher;
