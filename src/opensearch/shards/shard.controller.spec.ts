import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ShardController } from './shard.controller';

describe('ShardController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ShardController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /_cat/shards/otlp-metrics', () => {
    it('should return array of shards with correct structure and values', () => {
      return request(app.getHttpServer())
        .get('/_cat/shards/otlp-metrics')
        .query({ format: 'json' })
        .expect(200)
        .expect((res) => {
          const result = res.body;
          expect(result).toHaveLength(6);

          const shard = result[0];
          expect(shard).toMatchObject({
            index: expect.stringMatching(/^otlp-metrics/),
            shard: expect.stringMatching(/^[0-2]$/),
            prirep: expect.stringMatching(/^[pr]$/),
            state: expect.stringMatching(/^(STARTED|RELOCATING|UNASSIGNED|INITIALIZING)$/),
            docs: expect.any(String),
            store: expect.stringMatching(/^\d+\.\d+gb$/),
            ip: expect.stringMatching(/^100\.96\.\d+\.\d+$/),
            node: expect.stringMatching(/^opensearch-cluster-master-[0-2]$/)
          });
        });
    });
  });
});
