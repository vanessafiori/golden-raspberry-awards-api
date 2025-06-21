import { Module } from '@nestjs/common';
import { MovieModule } from '../../movie/movie.module';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';

@Module({
  controllers: [ProducerController],
  providers: [ProducerService],
  imports: [MovieModule],
})
export class ProducerModule {}
