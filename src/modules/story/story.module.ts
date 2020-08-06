import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryRepository } from './story.repository';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoryRepository])
  ],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule { }
