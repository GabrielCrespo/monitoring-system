import UserType from "../../../user_type/typeorm/entities/UserType";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
