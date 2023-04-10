import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPaginatedTodosDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pageNb: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  itemsNb: number;
}
