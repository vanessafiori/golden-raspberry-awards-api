import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entity/movie.entity';
import { ERROR_MESSAGES } from '../../common/constants/error.messages';

@Injectable()
export class MovieService {

  private readonly logger = new Logger(MovieService.name);

  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  async create(movies: any[]): Promise<void> {
    try {
      for (const movie of movies) {
        const title = movie.title;

        const existing = await this.movieRepo.findOne({ where: { title } });

        if (!existing) {
          const newMovie = this.movieRepo.create({
            year: parseInt(movie.year),
            title: movie.title,
            studio: movie.studios,
            producer: movie.producers,
            winner: movie.winner?.toLowerCase() === 'yes',
          });

          await this.movieRepo.save(newMovie);
        }
      }
    } catch (error) {
      this.logger.error(ERROR_MESSAGES.MOVIE.SAVE_ERROR, error.stack);
      throw new HttpException(
        ERROR_MESSAGES.MOVIE.SAVE_ERROR,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getWinningMovies(): Promise<MovieDto[]> {

    try {
      const movies = await this.movieRepo.find({
        where: { winner: true },
        order: { year: 'ASC' },
      });

      return movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        studio: movie.studio,
        producer: movie.producer,
        winner: movie.winner,
      }));
    } catch (error) {
      this.logger.error(ERROR_MESSAGES.MOVIE.LIST_ERROR, error.stack);
      throw new HttpException(
        ERROR_MESSAGES.MOVIE.LIST_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}