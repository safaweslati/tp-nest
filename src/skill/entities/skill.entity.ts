import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeEntity } from '../../Generic/time.entity';
@Entity('skill')
export class SkillEntity extends TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  designation: string;
}
