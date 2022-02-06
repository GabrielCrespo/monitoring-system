import Course from "../../../course/typeorm/entities/Course";
import Role from "../../../roles/typeorm/entities/Role";
import StudentInstructorType from "../../../student_instructor_type/typeorm/entities/StudentInstructorType";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("aluno_instrutor")
class StudentInstructor {
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

  @ManyToOne(
    () => StudentInstructorType,
    (studentInstructorType) => studentInstructorType.alunos_instrutores,
    {
      eager: true,
      cascade: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }
  )
  tipo_aluno_instrutor: StudentInstructorType;

  @ManyToOne(() => Course, (course) => course.alunos_instrutores, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  curso: Course;

  @ManyToOne(() => Role, (role) => role.alunos_instrutores, {
    eager: true,
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  funcao: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StudentInstructor;
