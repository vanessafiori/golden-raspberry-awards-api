import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../../core/prisma/prisma.service';
import { MovieDto } from '../movie/dto/movie.dto';

@Injectable()
export class MovieService {

  constructor(
    private prisma: PrismaService
  ){ }

  async create(filmes: any){
    try {
      const creates = filmes.map(filme =>
        this.prisma.movie.upsert({
          where: { title: filme.title },
          update: {},
          create: {
            year: parseInt(filme.year),
            title: filme.title,
            studio: filme.studios,
            producer: filme.producers,
            winner: filme.winner?.toLowerCase() === 'yes' ? true : false
          },
        })
      )
      await this.prisma.$transaction(creates);

    } catch (error) {
      console.error('Erro ao salvar filmes:', error);
      throw new HttpException(
        'Ocorreu um erro ao salvar os filmes no banco de dados.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getWinningMovies(): Promise<MovieDto[]> {
    return this.prisma.movie.findMany({
      where: {
        winner: true
      },
      orderBy: {
        year: 'asc'
      }
    });
  }

}