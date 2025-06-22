import { Injectable } from '@nestjs/common';
import { MovieDto } from '../../movie/dto/movie.dto';
import { WinningProducerIntervalDTO } from '../dto/winning-producer-interval.dto';
import { MovieService } from '../../movie/movie.service';
import { ProducerDTO } from '../dto/producer.dto';

@Injectable()
export class ProducerService {

  constructor(
    private movieService: MovieService
  ){ }

  async getAwardIntervalsByProducer() {
    let min: WinningProducerIntervalDTO[] = [];
    let max: WinningProducerIntervalDTO[] = [];

    const movies = await this.movieService.getWinningMovies();
    if(movies.length === 0){ return { min, max} }
    
    const producers = this.getListProducers(movies);
    
    const winningProducers = this.getWinningProducers(producers);
    if(winningProducers.length === 0){ return { min, max} }

    const producerWinIntervals = this.getProducersWinIntervals(winningProducers);

    const interval: { minInterval: number; maxInterval: number } = this.getMinMaxInterval(producerWinIntervals);

    min = producerWinIntervals.filter(p => p.interval === interval.minInterval);
    max = producerWinIntervals.filter(p => p.interval === interval.maxInterval);

    return { min, max } ;
  }

  getMinMaxInterval(producerWinIntervals: WinningProducerIntervalDTO[]){
    const producerWinIntervalsSort = producerWinIntervals.sort((a, b) => a.interval - b.interval)

    const minInterval = producerWinIntervalsSort[0].interval;
    const maxInterval = producerWinIntervalsSort[producerWinIntervalsSort.length-1].interval;

    return { minInterval, maxInterval}
  }

  getProducersWinIntervals(producers: ProducerDTO[]){
    let producerWinIntervals: WinningProducerIntervalDTO[] = [];
    producers.forEach(c => {
      const processed = producerWinIntervals.some( f => f.producer === c.name);

      if (!processed) {
        const producer = producers.filter(f => f.name === c.name);

        for (let i = 0; i < producer.length - 1; i++) {
          const interval = {
            producer: producer[i].name,
            interval: (producer[i+1].year - producer[i].year),
            previousWin: producer[i].year,
            followingWin: producer[i+1].year,
          }
          producerWinIntervals.push(interval);
        }

      }
    });
    return producerWinIntervals;
  }

  getWinningProducers(producers: ProducerDTO[]){
    const winners: ProducerDTO[] = [];

    producers.forEach( producer => {
      const winner = producers.filter(f => f.name === producer.name).length > 1;
      if(winner){
        winners.push(producer);
      }
    });
    if(winners.length === 0){ return winners};

    return winners.sort((a, b) => a.name.localeCompare(b.name));
  }

  getListProducers(movies: MovieDto[]) {
    return movies.flatMap(movie => {
      const listProducersFormat = movie.producer
        .replaceAll(' and ', ',')
        .replaceAll(',,', ',')
        .split(',');

      return listProducersFormat.map(nameProducer => ({
        name: nameProducer.trim(),
        year: movie.year
      }));
    });
  }

}
