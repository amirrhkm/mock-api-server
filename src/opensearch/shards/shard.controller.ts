import { Controller, Get, Param, Query } from '@nestjs/common';

interface ShardInfo {
  index: string;
  shard: string;
  prirep: string;
  state: string;
  docs: string;
  store: string;
  ip: string;
  node: string;
}

const MASTER_NODES = {
  MASTER_0: 'opensearch-cluster-master-0',
  MASTER_1: 'opensearch-cluster-master-1',
  MASTER_2: 'opensearch-cluster-master-2'
} as const;

const NODE_IPS = {
  MASTER_0: '100.96.12.10',
  MASTER_1: '100.96.11.159',
  MASTER_2: '100.96.13.58'
} as const;

const PRIREP = {
  PRIMARY: 'p',
  REPLICA: 'r'
} as const;

const STATE = {
  STARTED: 'STARTED',
  UNASSIGNED: 'UNASSIGNED',
  RELOCATING: 'RELOCATING',
  INITIALIZING: 'INITIALIZING'
} as const;

@Controller()
export class ShardController {
  private getRandomMetricsStore(): string {
    const size = (Math.random() * (20 - 15) + 15).toFixed(1);
    return `${size}gb`;
  }

  private getRandomLogsStore(): string {
    const size = (Math.random() * (120 - 40) + 40).toFixed(1);
    return `${size}mb`;
  }

  private getRandomMetricsDocs(): string {
    const docs = Math.floor(Math.random() * (150000000 - 100000000) + 100000000);
    return docs.toString();
  }

  private getRandomLogsDocs(): string {
    const docs = Math.floor(Math.random() * (300000 - 1000) + 1000);
    return docs.toString();
  }

  @Get(':type/shards/:index')
  getShardInfo(
    @Param('type') type: string,
    @Param('index') index: string,
    @Query('format') format?: string
  ): ShardInfo[] {
    if (type === '_cat' && index === 'otlp-metrics' && format === 'json') {
      return [
        {
          index: 'otlp-metrics',
          shard: '0',
          prirep: PRIREP.PRIMARY,
          state: STATE.STARTED,
          docs: this.getRandomMetricsDocs(),
          store: this.getRandomMetricsStore(),
          ip: NODE_IPS.MASTER_0,
          node: MASTER_NODES.MASTER_0
        },
        {
          index: 'otlp-metrics',
          shard: '0',
          prirep: PRIREP.REPLICA,
          state: STATE.UNASSIGNED,
          docs: this.getRandomMetricsDocs(),
          store: this.getRandomMetricsStore(),
          ip: NODE_IPS.MASTER_2,
          node: MASTER_NODES.MASTER_2
        },
        {
          index: 'otlp-metrics',
          shard: '1',
          prirep: PRIREP.PRIMARY,
          state: STATE.UNASSIGNED,
          docs: this.getRandomMetricsDocs(),
          store: this.getRandomMetricsStore(),
          ip: NODE_IPS.MASTER_1,
          node: MASTER_NODES.MASTER_1
        },
        {
          index: 'otlp-metrics',
          shard: '1',
          prirep: PRIREP.REPLICA,
          state: STATE.STARTED,
          docs: this.getRandomMetricsDocs(),
          store: this.getRandomMetricsStore(),
          ip: NODE_IPS.MASTER_2,
          node: MASTER_NODES.MASTER_2
        },
        {
          index: 'otlp-metrics',
          shard: '2',
          prirep: PRIREP.PRIMARY,
          state: STATE.STARTED,
          docs: this.getRandomMetricsDocs(),
          store: this.getRandomMetricsStore(),
          ip: NODE_IPS.MASTER_1,
          node: MASTER_NODES.MASTER_1
        },
        {
          index: 'otlp-metrics',
          shard: '2',
          prirep: PRIREP.REPLICA,
          state: STATE.UNASSIGNED,
          docs: this.getRandomMetricsDocs(),
          store: this.getRandomMetricsStore(),
          ip: NODE_IPS.MASTER_0,
          node: MASTER_NODES.MASTER_0
        }
      ];
    }

    if (type === '_cat' && index === 'otlp-logs' && format === 'json') {
      return [
        {
          index: 'otlp-logs',
          shard: '0',
          prirep: PRIREP.PRIMARY,
          state: STATE.STARTED,
          docs: this.getRandomLogsDocs(),
          store: this.getRandomLogsStore(),
          ip: NODE_IPS.MASTER_0,
          node: MASTER_NODES.MASTER_0
        },
        {
          index: 'otlp-logs',
          shard: '0',
          prirep: PRIREP.REPLICA,
          state: STATE.UNASSIGNED,
          docs: this.getRandomLogsDocs(),
          store: this.getRandomLogsStore(),
          ip: NODE_IPS.MASTER_2,
          node: MASTER_NODES.MASTER_2
        },
        {
          index: 'otlp-logs',
          shard: '1',
          prirep: PRIREP.PRIMARY,
          state: STATE.UNASSIGNED,
          docs: this.getRandomLogsDocs(),
          store: this.getRandomLogsStore(),
          ip: NODE_IPS.MASTER_1,
          node: MASTER_NODES.MASTER_1
        },
        {
          index: 'otlp-logs',
          shard: '1',
          prirep: PRIREP.REPLICA,
          state: STATE.STARTED,
          docs: this.getRandomLogsDocs(),
          store: this.getRandomLogsStore(),
          ip: NODE_IPS.MASTER_2,
          node: MASTER_NODES.MASTER_2
        },
        {
          index: 'otlp-logs',
          shard: '2',
          prirep: PRIREP.PRIMARY,
          state: STATE.STARTED,
          docs: this.getRandomLogsDocs(),
          store: this.getRandomLogsStore(),
          ip: NODE_IPS.MASTER_1,
          node: MASTER_NODES.MASTER_1
        },
        {
          index: 'otlp-logs',
          shard: '2',
          prirep: PRIREP.REPLICA,
          state: STATE.UNASSIGNED,
          docs: this.getRandomLogsDocs(),
          store: this.getRandomLogsStore(),
          ip: NODE_IPS.MASTER_0,
          node: MASTER_NODES.MASTER_0
        }
      ];
    }
  }
}
