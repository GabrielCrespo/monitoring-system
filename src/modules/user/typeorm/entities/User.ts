import UserType from "../../../user_type/typeorm/entities/UserType";
import Student from "../../../student/typeorm/entities/Student";
import Teacher from "../../../teacher/typeorm/entities/Teacher";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity("usuario")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  email: string;

  @Exclude()
  @Column()
  senha: string;

  @Exclude()
  @ManyToOne(() => UserType, (type) => type.usuarios, { eager: true })
  tipo_usuario: UserType;

  @Exclude()
  @Column("boolean", { default: false })
  eh_admin: boolean;

  @OneToOne(() => Student, (student) => student.usuario, {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  aluno: Student;

  @OneToOne(() => Teacher, (teacher) => teacher.usuario, {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  professor: Teacher;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
