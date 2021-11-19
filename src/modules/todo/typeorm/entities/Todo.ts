import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TodoFinishedEnum from '../../enumerations/TodoFinishedEnum';

@Entity('todo')
class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TodoFinishedEnum,
    default: TodoFinishedEnum.N,
  })
  finished: TodoFinishedEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Todo;
