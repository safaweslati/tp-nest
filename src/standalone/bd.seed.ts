import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import {
  randDirectoryPath,
  randEmail,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randSkill,
  randUserName,
} from '@ngneat/falso';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
import { SkillService } from '../skill/skill.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService: UserService = app.get(UserService);
  const cvService: CvService = app.get(CvService);
  const skillService: SkillService = app.get(SkillService);
  for (let i = 0; i < 9; i++) {
    const user = { email: randEmail(), username: randUserName() };
    await userService.add(user);
    const skill = {
      designation: randSkill(),
    };
    await skillService.add(skill);
  }
  const users = userService.findAll();
  for (const user of await users) {
    const cv = {
      name: randLastName(),
      firstname: randFirstName(),
      age: randNumber({ min: 16, max: 60 }),
      cin: randNumber({ min: 1400000, max: 16000000 }),
      job: randJobTitle(),
      path: randDirectoryPath(),
      user: user,
      skills: [],
    };
    await cvService.add(cv);
  }
  const cvs = await cvService.findAll();
  for (const cv of cvs) {
    const index = Math.floor(Math.random() * 10) + 1;
    cv.skills.push(await skillService.findOne(index));
    await cvService.add(cv);
  }
}
bootstrap();
