import { Controller, Get, Param, BadRequestException } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get(':serviceName')
  getServiceHealth(@Param('serviceName') serviceName: string) {

    const validServices = [
      'application',
      'database',
      'stockage',
    ];

    if (!validServices.includes(serviceName)) {
      throw new BadRequestException(`Invalid service: ${serviceName}`);
    }

    const healthStatus = Math.random() > 0.5 ? 'up' : 'down';

    return { service: serviceName, health_status: healthStatus };
  }
}
