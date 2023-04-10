import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ErrorMessages } from '../ErrorMessages/Error-Messages';

export class AddTodoDto {
  @IsString({ message: `le nom ${ErrorMessages.IsString}` })
  @IsNotEmpty({ message: `le nom ${ErrorMessages.IsNotEmpty}` })
  @MinLength(3, { message: `le nom ${ErrorMessages.MinLength}` })
  @MaxLength(10, { message: `le nom ${ErrorMessages.MaxLength}` })
  name: string;
  @IsString({ message: `la description ${ErrorMessages.IsString}` })
  @MinLength(10, { message: `la description ${ErrorMessages.MinLength}` })
  @IsNotEmpty({ message: `la description ${ErrorMessages.IsNotEmpty}` })
  description: string;
  // @IsNotEmpty()
  createdBy: string;
}
