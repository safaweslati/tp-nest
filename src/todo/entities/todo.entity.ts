import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TodoStatusEnum } from '../models/todo.model';
import { TimeEntity } from '../../Generic/time.entity';

@Entity('todo')
export class TodoEntity extends TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 10,
  })
  name: string;
  @Column()
  description: string;
  @Column({ default: TodoStatusEnum.waiting })
  status: TodoStatusEnum;
  @Column()
  createdBy: string;
}
