import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as path from 'path';
import { FileService } from './file.service';
import { MovieService } from './../../modules/movie/movie.service';
import { ERROR_MESSAGES } from '../../common/constants/error.messages';

@Injectable()
export class InitializationService implements OnApplicationBootstrap {

  constructor(
    private fileService: FileService,
    private movieService: MovieService
  ){ }

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'test') return;
    await this.processAndSaveWorstMovies();
  }

  async processAndSaveWorstMovies() {
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'assets', 'movielist.csv');
      
      const moviesJSON = await this.fileService.convertCsvToJson(filePath);
      if(moviesJSON.length > 0){
        await this.movieService.create(moviesJSON);
      }

    } catch (error) {
      console.error(ERROR_MESSAGES.MOVIE.INIT_PROCESSING_ERROR, error.message || error);
      process.exit(1);
    }
  }

}