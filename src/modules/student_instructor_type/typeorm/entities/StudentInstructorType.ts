import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tipo_aluno_instrutor")
class StudentInstructorType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StudentInstructorType;
