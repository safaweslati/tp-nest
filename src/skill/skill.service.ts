import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>,
  ) {}

  async add(createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    return await this.skillRepository.save(createSkillDto);
  }

  async findAll(): Promise<SkillEntity[]> {
    return await this.skillRepository.find();
  }

  async findOne(id: number): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOneById(id);
    if (!skill) {
      throw new NotFoundException(`le skill d'id ${id} n'existe pas`);
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    return await this.skillRepository.update(id, updateSkillDto);
  }

  async remove(id: number) {
    return await this.skillRepository.delete(id);
  }
}
