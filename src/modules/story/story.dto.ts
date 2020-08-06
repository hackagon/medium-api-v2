import { IsNotEmpty, IsEmpty } from 'class-validator';

export enum StoryStatus {
  Draft = "Draft",
  Published = "Published",
  Modified = "Modified"
}

// Create
export class CreateStoryDTO {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  imageUrl: string;
}

// Update
export class UpdateStoryDTO {
  @IsNotEmpty()
  title: string;

  imageUrl: string;
}

// Replace
export class ReplaceStoryDTO {
  @IsNotEmpty()
  title: string;

  imageUrl: string;
}
