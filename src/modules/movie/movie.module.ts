import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';

@Module({
  providers: [MovieService],
  exports: [MovieService],
  imports: [TypeOrmModule.forFeature([Movie])],
})
export class MovieModule {}