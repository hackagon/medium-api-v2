import { Module } from "@nestjs/common";
import { StoryItemController } from './story-item.controller';
import { StoryItemService } from './story-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from '../item/item.repository';
import { ItemService } from '../item/item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemRepository])
  ],
  controllers: [StoryItemController],
  providers: [StoryItemService, ItemService]
})
export class StoryItemModule { };