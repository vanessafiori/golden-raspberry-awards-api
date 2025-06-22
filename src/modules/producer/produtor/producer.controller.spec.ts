import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { MovieModule } from './../../../modules/movie/movie.module';
import { PrismaModule } from './../../../core/prisma/prisma.module';

describe('ProducerController', () => {
  let controller: ProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MovieModule, PrismaModule],
      controllers: [ProducerController],
      providers: [ProducerService],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
