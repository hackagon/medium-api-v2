import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemRepository } from '../item/item.repository';
import { StoryRepository } from '../story/story.repository';
import { ItemEntity } from "../item/item.entity";
import { CreateItemDTO, UpdateItemDTO } from '../item/item.dto';
import { ItemService } from '../item/item.service';

@Injectable()
export class StoryItemService {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
    private itemService: ItemService
  ) { }

  async getItemViaStory(storyId: number, itemId: number): Promise<ItemEntity> {
    return await this.itemService.getItemById(itemId);
  }

  async getItemsViaStory(storyId: number): Promise<ItemEntity[]> {
    const items = this.itemRepository.find({ storyId });
    return items;
  }

  async createItemViaStory(storyId: number, data: CreateItemDTO): Promise<ItemEntity> {
    const count = (await this.getItemsViaStory(storyId)).length
    const displayIndex = count;
    return await this.itemService.createItem({
      ...data, storyId, displayIndex
    })
  }

  async updateItemViaStory(storyId: number, itemId: number, data: UpdateItemDTO): Promise<ItemEntity> {
    return await this.itemService.updateItemById(itemId, data);
  }

  async deleteItemViaStory(storyId: number, itemId: number): Promise<ItemEntity> {
    return await this.itemService.deleteItemById(itemId);
  }
}