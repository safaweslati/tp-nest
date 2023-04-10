import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get()
  get() {
    console.log('Methode get du module Premier');
    return 'Get';
  }
  @Post()
  post() {
    console.log('Methode post du module Premier');
    return 'Post';
  }
  @Delete()
  delete() {
    console.log('Methode delete du module Premier');
    return 'Delete';
  }
  @Put()
  put() {
    console.log('Methode put du module Premier');
    return 'Put';
  }
  @Patch()
  patch() {
    console.log('Methode patch du module Premier');
    return 'Patch';
  }
}
