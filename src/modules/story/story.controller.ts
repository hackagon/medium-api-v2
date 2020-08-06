import { Controller, Get, Param, Body, Post, Patch, Put, Delete } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDTO, UpdateStoryDTO, ReplaceStoryDTO } from './story.dto';
import { StoryEntity } from './story.entity';

@Controller('/stories')
export class StoryController {
  constructor(
    private storyService: StoryService
  ) { }

  @Get()
  getStories(): Promise<StoryEntity[]> {
    return this.storyService.getStories();
  }

  @Get(":id")
  getStoryById(@Param("id") id: number): Promise<StoryEntity> {
    return this.storyService.getStoryById(id);
  };

  @Post()
  createStory(@Body() storyDTO: CreateStoryDTO): Promise<StoryEntity> {
    return this.storyService.createStory(storyDTO);
  };

  @Put(":id")
  replaceStoryById(@Param("id") id: number, storyDRO: ReplaceStoryDTO) {
    return this.storyService.replaceStoryById(id, storyDRO);
  }

  @Patch(":id")
  updateStoryById(@Param("id") id: number, storyDRO: UpdateStoryDTO) {
    return this.storyService.updateStoryById(id, storyDRO);
  }

  @Delete(":id")
  deleteStoryById(@Param("id") id: number) {
    return this.storyService.deleteStoryById(id);
  }

  @Patch("/:id/publish")
  publishStoryById(@Param("id") id: number) {
    return this.storyService.publishStoryById(id);
  }
}