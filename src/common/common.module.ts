import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const uuid = {
  useValue: uuidv4,
  provide: 'UUID',
};
@Global()
@Module({
  providers: [uuid],
  exports: [uuid],
})
export class CommonModule {}
