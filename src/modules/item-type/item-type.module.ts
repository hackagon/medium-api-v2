import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeRepository } from './item-type.repository';
import { ItemTypeController } from './item-type.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemTypeRepository])
  ],
  controllers: [ItemTypeController],
  providers: [ItemTypeService]
})
export class ItemTypeModule { }
