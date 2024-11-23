import { Module } from '@nestjs/common';
import { ShardController } from './shard.controller';

@Module({
  controllers: [ShardController]
})
export class ShardModule {}
