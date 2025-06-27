import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return correct producer intervals from original CSV file', async () => {
    const res = await request(app.getHttpServer()).get('/producers/award-intervals');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        }
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        }
      ]
    });
  });

  it('should return with expected properties', async () => {
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

    if (res.body.max.length > 0) {
      expect(res.body.max[0]).toHaveProperty('producer');
      expect(res.body.max[0]).toHaveProperty('interval');
      expect(res.body.max[0]).toHaveProperty('previousWin');
      expect(res.body.max[0]).toHaveProperty('followingWin');
    }
  });

  afterAll(async () => {
    await app.close();
  });
  
});
