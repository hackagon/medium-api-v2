import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeUpdate, BeforeRemove, getConnection, BeforeInsert } from 'typeorm';
import * as _ from "lodash";
import { StoryEntity } from '../story/story.entity';
import { StoryStatus } from '../story/story.dto';

@Entity({
  name: "item"
})
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @ManyToOne(type => StoryEntity, story => story.items, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "story_id"
  })
  storyId: number;

  @Column({
    name: "item_type_id"
  })
  itemTypeId: number;

  @Column({
    name: "content"
  })
  content: string;

  @Column({
    name: "display_index"
  })
  displayIndex: number;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeRemove()
  async updateStatus() {
    console.log("run")
    const story = await getConnection().getRepository(StoryEntity).findOne(this.storyId);

    let status: StoryStatus;
    switch (story.status) {
      case StoryStatus.Draft:
        status = StoryStatus.Draft
        break;

      case StoryStatus.Published:
        status = StoryStatus.Modified
        break;

      case StoryStatus.Modified:
        status = StoryStatus.Modified
        break;
    }

    story.status = status;
    await story.save()
  }
}
