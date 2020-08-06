import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeRepository } from './item-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemTypeRepository])
  ],
  controllers: [],
  providers: [ItemTypeService]
})
export class ItemTypeModule { }
