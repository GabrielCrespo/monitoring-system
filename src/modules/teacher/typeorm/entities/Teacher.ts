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

  @ManyToOne(() => Role, (role) => role.professor)
  funcao: Role;

  @OneToOne(() => Class)
  @JoinColumn()
  turma: Class;

  @Column()
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Teacher;
