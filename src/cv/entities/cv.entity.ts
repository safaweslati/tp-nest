import { TimeEntity } from '../../Generic/time.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';

@Entity('cv')
export class CvEntity extends TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 60,
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(() => UserEntity, (user) => user.cvs, {
    nullable: false,
    eager: true,
  })
  user: UserEntity;
  @ManyToMany(() => SkillEntity, { eager: true })
  @JoinTable()
  skills: SkillEntity[];
}
