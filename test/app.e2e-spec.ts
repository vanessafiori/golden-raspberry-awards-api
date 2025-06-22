import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { MovieService } from '../src/modules/movie/movie.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  const movieServiceMock = {
    getWinningMovies: jest.fn().mockResolvedValue([]),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MovieService)
      .useValue(movieServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/producers/award-intervals (GET)', () => {
    return request(app.getHttpServer())
      .get('/producers/award-intervals')
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('min');
        expect(res.body).toHaveProperty('max');
      });
  });

  it('should return producers with expected properties', async () => {
    const res = await request(app.getHttpServer()).get('/producers/award-intervals');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.min)).toBe(true);
    expect(Array.isArray(res.body.max)).toBe(true);

    if (res.body.min.length > 0) {
      expect(res.body.min[0]).toHaveProperty('producer');
      expect(res.body.min[0]).toHaveProperty('interval');
      expect(res.body.min[0]).toHaveProperty('previousWin');
      expect(res.body.min[0]).toHaveProperty('followingWin');
    }
  });

  it('should return empty arrays when there are no winning producers', async () => {
    const res = await request(app.getHttpServer()).get('/producers/award-intervals');
    expect(res.status).toBe(200);
    expect(res.body.min).toEqual([]);
    expect(res.body.max).toEqual([]);
  });

  it('should return correct intervals with mock winning producers', async () => {
    const mockMovies = [
      { producer: 'Producer A', year: 2000, winner: true },
      { producer: 'Producer A', year: 2005, winner: true },
      { producer: 'Producer A', year: 2007, winner: true },
      { producer: 'Producer B', year: 1990, winner: true },
      { producer: 'Producer B', year: 2010, winner: true },
      { producer: 'Producer B', year: 2024, winner: true },
    ];

    movieServiceMock.getWinningMovies.mockResolvedValue(mockMovies);

    const res = await request(app.getHttpServer()).get('/producers/award-intervals');

    expect(res.status).toBe(200);
    expect(res.body.min[0].interval).toBe(2);
    expect(res.body.max[0].interval).toBe(20);
  });

  it('should handle multiple producers with same interval', async () => {
    const mockMovies = [
      { producer: 'Producer A', year: 2000, winner: true },
      { producer: 'Producer A', year: 2001, winner: true },
      { producer: 'Producer B', year: 2010, winner: true },
      { producer: 'Producer B', year: 2011, winner: true },
    ];

    movieServiceMock.getWinningMovies.mockResolvedValue(mockMovies);

    const res = await request(app.getHttpServer()).get('/producers/award-intervals');

    expect(res.status).toBe(200);
    expect(res.body.min.length).toBe(2);
    expect(res.body.max.length).toBe(2);
  });

  it('should handle service errors gracefully', async () => {
    movieServiceMock.getWinningMovies.mockRejectedValue(new Error('Database error'));

    const res = await request(app.getHttpServer()).get('/producers/award-intervals');

    expect(res.status).toBe(500);
  });

  afterAll(async () => {
    await app.close();
  });
  
});
