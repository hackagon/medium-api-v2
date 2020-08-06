import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemRepository } from "./item.repository";
import { ItemEntity } from "./item.entity";
import { CreateItemDTO, UpdateItemDTO } from "./item.dto";
import * as _ from "lodash";

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository
  ) { }

  async getItemById(id: number): Promise<ItemEntity> {
    const foundItem = await this.itemRepository.findOne(id);
    if (!foundItem) throw new NotFoundException("Item not found")

    return foundItem;
  }

  async createItem(data: CreateItemDTO): Promise<ItemEntity> {
    const newItem = this.itemRepository.create(data);
    await newItem.save()
    return newItem;
  }

  async updateItemById(id: number, data: UpdateItemDTO): Promise<ItemEntity> {
    let foundItem = await this.getItemById(id);
    foundItem = _.assign(foundItem, data, {});

    await foundItem.save()
    return foundItem;
  }

  async deleteItemById(id: number): Promise<ItemEntity> {
    let foundItem = await this.getItemById(id);

    await foundItem.remove()
    return foundItem;
  }
}