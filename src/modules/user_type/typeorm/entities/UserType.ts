import User from "../../../user/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tipo_usuario")
class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  descricao: string;

  @OneToMany(() => User, (user) => user.tipo_usuario)
  usuarios: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserType;
