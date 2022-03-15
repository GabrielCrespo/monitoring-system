import UserType from "../../../user_type/typeorm/entities/UserType";
import Student from "../../../student/typeorm/entities/Student";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("usuario")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  email: string;

  @Column()
  senha: string;

  @ManyToOne(() => UserType, (type) => type.usuarios, { eager: true })
  tipo_usuario: UserType;

  @Column("boolean", { default: false })
  eh_admin: boolean;

  @OneToOne(() => Student, (student) => student.usuario, {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  aluno: Student;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
