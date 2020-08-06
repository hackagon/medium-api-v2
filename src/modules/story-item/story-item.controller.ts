import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { ItemEntity } from "../item/item.entity";
import { CreateItemDTO } from '../item/item.dto';
import { StoryItemService } from './story-item.service';
import { ItemService } from '../item/item.service';

@Controller("stories/:storyId")
export class StoryItemController {
  constructor(
    private storyItemService: StoryItemService,
    private itemService: ItemService
  ) { }

  @Get()
  async getItemsViaStory(@Param("storyId") storyId: number): Promise<ItemEntity[]> {
    return await this.storyItemService.getItemsViaStory(storyId);
  }

  @Post()
  async createItemViaStory(@Param("storyId") storyId: number, @Body() data: CreateItemDTO): Promise<ItemEntity> {
    return await this.storyItemService.createItemViaStory(storyId, data);
  }

  @Patch("/items/:itemId")
  async updateItemByItemIdViaStory(@Param("storyId") storyId: number, @Param("itemId") itemId: number, @Body() data: CreateItemDTO): Promise<ItemEntity> {
    return await this.storyItemService.updateItemViaStory(storyId, itemId, data);
  }

  @Delete("/items/:itemId")
  async deleteItemByItemIdViaStory(@Param("storyId") storyId: number, @Param("itemId") itemId: number): Promise<ItemEntity> {
    return await this.storyItemService.deleteItemViaStory(storyId, itemId);
  }

  @Patch("/move_item_positions")
  async moveItemPositions(
    @Param("storyId") storyId: number,
    @Body() data: any
  ) {
    return await this.itemService.moveItemPositions(storyId, data)
  }
}