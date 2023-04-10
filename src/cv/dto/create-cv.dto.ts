import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from '../../user/entities/user.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';

export class CreateCvDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(16)
  @Max(62)
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  cin: number;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsOptional()
  path: string;

  @IsNotEmpty()
  user: UserEntity;

  @IsOptional()
  skills: SkillEntity[];
}
