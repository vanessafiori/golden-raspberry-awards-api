import { Injectable } from '@nestjs/common';
import { MovieDto } from '../../movie/dto/movie.dto';
import { MovieService } from '../../movie/movie.service';
import { WinningProducerIntervalDTO } from '../dto/winning-producer-interval.dto';

@Injectable()
export class ProducerService {

  constructor(private movieService: MovieService) {}

  async getAwardIntervalsByProducer() {
    const movies = await this.movieService.getWinningMovies();

    if (movies.length === 0) {
      return { min: [], max: [] };
    }

    const producers = this.formatProducerList(movies);

    return this.getProducersWithWinIntervals(producers);
  }

  private formatProducerList(movies: MovieDto[]): Map<string, number[]> {
    const mapProducers = new Map<string, number[]>();

    for (const movie of movies) {
      const listProducers = movie.producer
        .replaceAll(' and ', ',')
        .replaceAll(',,', ',')
        .split(',')
        .map(p => p.trim());

      for (const producer of listProducers) {
        if (!mapProducers.has(producer)) {
          mapProducers.set(producer, []);
        }
        mapProducers.get(producer)?.push(movie.year);
      }
    }
    return mapProducers;
  }

  private getProducersWithWinIntervals(mapProducers: Map<string, number[]>): { min: WinningProducerIntervalDTO[]; max: WinningProducerIntervalDTO[] } {

    const min: WinningProducerIntervalDTO[] = [];
    const max: WinningProducerIntervalDTO[] = [];

    let minInterval = Infinity;
    let maxInterval = -Infinity;

    for (const [producer, years] of mapProducers) {

      if (years.length < 2) continue;

      for (let j = 0; j < years.length - 1; j++) {
        const interval = years[j + 1] - years[j];

        const data = {
          producer,
          interval,
          previousWin: years[j],
          followingWin: years[j + 1],
        };

        if (interval < minInterval) {
          minInterval = interval;
          min.length = 0;
          min.push(data);
        } else if (interval === minInterval) {
          min.push(data);
        }

        if (interval > maxInterval) {
          maxInterval = interval;
          max.length = 0;
          max.push(data);
        } else if (interval === maxInterval) {
          max.push(data);
        }
      }
    }
    
    return { min, max };
  }

}
