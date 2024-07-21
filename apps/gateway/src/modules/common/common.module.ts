import { Module } from '@nestjs/common';
import { CommonLibModule } from '@/libs/common/src';

@Module({
  imports: [CommonLibModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
