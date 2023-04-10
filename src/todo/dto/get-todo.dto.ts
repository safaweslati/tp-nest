import { TodoStatusEnum } from '../models/todo.model';
import { Optional } from '@nestjs/common';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class GetTodoDto {
  @Optional()
  @IsString()
  critere: string;
  @IsOptional()
  @IsIn([TodoStatusEnum.actif, TodoStatusEnum.waiting, TodoStatusEnum.done])
  status: TodoStatusEnum;
}
