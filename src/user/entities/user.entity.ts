import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';
import { TimeEntity } from '../../Generic/time.entity';

@Entity('user')
export class UserEntity extends TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
    unique: true,
  })
  username: string;
  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @OneToMany(() => CvEntity, (cv) => cv.user, {
    cascade: true,
    nullable: true,
   // eager: true,
  })
  cvs: CvEntity[];
}
