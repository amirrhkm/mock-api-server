import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ShardModule } from './opensearch/shards/shard.module';

@Module({
  imports: [HealthModule, ShardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
