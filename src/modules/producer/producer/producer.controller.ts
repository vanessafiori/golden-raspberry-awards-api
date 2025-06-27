import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producers')
export class ProducerController {

  constructor(
    private readonly producerService: ProducerService
  ) {}

  @Get('award-intervals')
  getIntervaloPremios() {
    return this.producerService.getAwardIntervalsByProducer();
  }

}
