import { Test, TestingModule } from '@nestjs/testing';
import { RamoService } from './ramo.service';

describe('RamoService', () => {
  let service: RamoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamoService],
    }).compile();

    service = module.get<RamoService>(RamoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
