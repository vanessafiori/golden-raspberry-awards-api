import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { FileService } from './core/services/file.service';
import { MovieModule } from './modules/movie/movie.module';
import { InitializationService } from './core/services/inicializacao.service';
import { ProducerModule } from './modules/producer/produtor/producer.module';

@Module({
  imports: [
    MovieModule,
    PrismaModule,
    ProducerModule
  ],
  controllers: [ AppController ],
  providers: [ 
    InitializationService,
    FileService,
    AppService,
  ],
})
export class AppModule {}
