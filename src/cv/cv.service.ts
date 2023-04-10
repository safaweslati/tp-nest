import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  async add(createCvDto: CreateCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(createCvDto);
  }

  async findAll(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  async findOne(id: number): Promise<CvEntity> {
    const cv = await this.cvRepository.findOneById(id);
    if (!cv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    return await this.cvRepository.update(id, updateCvDto);
  }

  async remove(id: number) {
    return await this.cvRepository.delete(id);
  }
}
