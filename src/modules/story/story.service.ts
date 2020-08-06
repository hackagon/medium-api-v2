import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { StoryRepository } from './story.repository';
import { StoryEntity } from './story.entity';
import { CreateStoryDTO, ReplaceStoryDTO, UpdateStoryDTO, StoryStatus } from './story.dto';
import * as _ from "lodash";

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryRepository) private storyRepository: StoryRepository
  ) {
  }

  async getStories(): Promise<StoryEntity[]> {
    return await this.storyRepository.find();
  }

  async getStoryById(id: number): Promise<StoryEntity> {
    const foundStory = await this.storyRepository.findOne(id);
    if (!foundStory) throw new NotFoundException("Story not found")

    return foundStory;
  }

  async createStory(storyDTO: CreateStoryDTO): Promise<StoryEntity> {
    const newStory = this.storyRepository.create(storyDTO);
    return await newStory.save()
  }

  async replaceStoryById(id: number, storyDTO: ReplaceStoryDTO): Promise<StoryEntity> {
    const foundStory = await this.getStoryById(id);

    _.chain(storyDTO)
      .keys()
      .value()
      .forEach(attr => foundStory[attr] = storyDTO[attr])

    await foundStory.save();
    return foundStory;
  }

  async updateStoryById(id: number, storyDTO: UpdateStoryDTO): Promise<StoryEntity> {
    let foundStory = await this.getStoryById(id);

    foundStory = _.assign(foundStory, storyDTO, {})
    await foundStory.save();

    return foundStory;
  }

  async deleteStoryById(id: number): Promise<StoryEntity> {
    let foundStory = await this.getStoryById(id);

    this.storyRepository.delete(id)
    return foundStory;
  }

  async publishStoryById(id: number): Promise<StoryEntity> {
    let foundStory = await this.getStoryById(id);
    foundStory.status = StoryStatus.Published;

    await foundStory.save()
    return foundStory;
  }
}