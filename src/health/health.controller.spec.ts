import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { BadRequestException } from '@nestjs/common';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getServiceHealth', () => {
    it('should return health status for valid application service', () => {
      const result = controller.getServiceHealth('application');
      expect(result).toHaveProperty('service', 'application');
      expect(result).toHaveProperty('health_status');
      expect(['up', 'down']).toContain(result.health_status);
    });

    it('should return health status for valid database service', () => {
      const result = controller.getServiceHealth('database');
      expect(result).toHaveProperty('service', 'database');
      expect(result).toHaveProperty('health_status');
      expect(['up', 'down']).toContain(result.health_status);
    });

    it('should return health status for valid stockage service', () => {
      const result = controller.getServiceHealth('stockage');
      expect(result).toHaveProperty('service', 'stockage');
      expect(result).toHaveProperty('health_status');
      expect(['up', 'down']).toContain(result.health_status);
    });

    it('should throw BadRequestException for invalid service name', () => {
      expect(() => {
        controller.getServiceHealth('invalid-service');
      }).toThrow(BadRequestException);
    });

    it('should include error message for invalid service name', () => {
      try {
        controller.getServiceHealth('invalid-service');
      } catch (error) {
        expect(error.message).toBe('Invalid service: invalid-service');
      }
    });
  });
});
