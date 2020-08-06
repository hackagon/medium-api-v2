export class CreateItemDTO {
  storyId?: number;
  itemTypeId: number;
  content: string;
  displayIndex: number;
}

export class UpdateItemDTO {
  content: string;
}