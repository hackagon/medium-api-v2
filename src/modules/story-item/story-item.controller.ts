import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { ItemEntity } from "../item/item.entity";
import { CreateItemDTO } from '../item/item.dto';
import { StoryItemService } from './story-item.service';

@Controller("stories/:storyId/items")
export class StoryItemController {
  constructor(
    private storyItemService: StoryItemService
  ) { }

  @Get()
  async getItemsViaStory(@Param("storyId") storyId: number): Promise<ItemEntity[]> {
    return await this.storyItemService.getItemsViaStory(storyId);
  }

  @Post()
  async createItemViaStory(@Param("storyId") storyId: number, @Body() data: CreateItemDTO): Promise<ItemEntity> {
    return await this.storyItemService.createItemViaStory(storyId, data);
  }

  @Patch(":itemId")
  async updateItemByItemIdViaStory(@Param("storyId") storyId: number, @Param("itemId") itemId: number, @Body() data: CreateItemDTO): Promise<ItemEntity> {
    return await this.storyItemService.updateItemViaStory(storyId, itemId, data);
  }

  @Delete(":itemId")
  async deleteItemByItemIdViaStory(@Param("storyId") storyId: number, @Param("itemId") itemId: number): Promise<ItemEntity> {
    return await this.storyItemService.deleteItemViaStory(storyId, itemId);
  }
}