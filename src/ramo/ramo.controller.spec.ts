import { Test, TestingModule } from '@nestjs/testing';
import { RamoController } from './ramo.controller';
import { RamoService } from './ramo.service';

describe('RamoController', () => {
  let controller: RamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RamoController],
      providers: [RamoService],
    }).compile();

    controller = module.get<RamoController>(RamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
