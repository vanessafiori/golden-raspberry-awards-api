import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { MovieModule } from './../../../modules/movie/movie.module';
import { PrismaModule } from './../../../core/prisma/prisma.module';

describe('ProducerService', () => {
  let service: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MovieModule, PrismaModule],
      providers: [ProducerService],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
