import { Module } from '@nestjs/common';
import { RamoService } from './ramo.service';
import { RamoController } from './ramo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ramo } from './entities/ramo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ramo])],
  controllers: [RamoController],
  providers: [RamoService]
})
export class RamoModule {}
