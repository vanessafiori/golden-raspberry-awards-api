import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as path from 'path';
import { FileService } from './file.service';
import { MovieService } from 'src/modules/movie/movie.service';

@Injectable()
export class InitializationService implements OnApplicationBootstrap {

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
      await this.movieService.create(moviesJSON);
    } catch (error) {
      console.error('Erro ao carregar os filmes na inicialização:', error.message || error);
      process.exit(1);
    }
  }

}