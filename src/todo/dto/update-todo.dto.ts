import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ErrorMessages } from '../../ErrorMessages/Error-Messages';
import { TodoStatusEnum } from '../../models/todo.model';

export class UpdateTodoDto {
  @IsString({ message: `le nom ${ErrorMessages.IsString}` })
  @IsOptional()
  @MinLength(3, { message: `le nom ${ErrorMessages.MinLength}` })
  @MaxLength(10, { message: `le nom ${ErrorMessages.MaxLength}` })
  name: string;
  @IsString({ message: `la description ${ErrorMessages.IsString}` })
  @MinLength(10, { message: `la description ${ErrorMessages.MinLength}` })
  @IsOptional()
  description: string;
  @IsIn([TodoStatusEnum.waiting, TodoStatusEnum.actif, TodoStatusEnum.done])
  status: TodoStatusEnum;
}
