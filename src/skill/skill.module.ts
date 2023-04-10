import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
  imports: [TypeOrmModule.forFeature([SkillEntity])],
})
export class SkillModule {}
