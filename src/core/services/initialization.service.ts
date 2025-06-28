import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as path from 'path';
import { FileService } from './file.service';
import { MovieService } from './../../modules/movie/movie.service';
import { ERROR_MESSAGES } from '../../common/constants/error.messages';

@Injectable()
export class InitializationService implements OnApplicationBootstrap {

  private readonly logger = new Logger(InitializationService.name);

  constructor(
    private fileService: FileService,
    private movieService: MovieService
  ){ }

  async onApplicationBootstrap() {
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
      this.logger.error(ERROR_MESSAGES.MOVIE.INIT_PROCESSING_ERROR, error.stack);
      process.exit(1);
    }
  }

}