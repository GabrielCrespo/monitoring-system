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

import Class from "../../../class/typeorm/entities/Class";
import Role from "../../../roles/typeorm/entities/Role";

@Entity("professor")
class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column()
  senha: string;

  @Column("varchar", { nullable: true })
  avatar: string;

  @ManyToOne(() => Role, (role) => role.professor, { eager: true })
  funcao: Role;

  @OneToOne(() => Class, turma => turma.professor,  { eager: true, })
  @JoinColumn()
  turma: Class;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Teacher;
