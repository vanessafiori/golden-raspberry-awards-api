import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './core/services/file.service';
import { InitializationService } from './core/services/initialization.service';
import { MovieModule } from './modules/movie/movie.module';
import { ProducerModule } from './modules/producer/producer/producer.module';
import { Movie } from './modules/movie/entity/movie.entity';

@Module({
  imports: [
    MovieModule,
    ProducerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Movie],
      synchronize: true,
    }),
    ],
  controllers: [ AppController ],
  providers: [ 
    InitializationService,
    FileService,
    AppService,
  ],
})
export class AppModule {}
