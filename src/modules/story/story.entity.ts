import {
  Entity, BaseEntity, PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn,
  BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn
} from "typeorm";
import { StoryStatus } from './story.dto';
import * as _ from "lodash";
import { cleanAccents } from "../../utils/handleString";
import { OneToMany } from 'typeorm';
import { ItemEntity } from '../item/item.entity';
import { UserEntity } from '../user/user.entity';

@Entity({
  name: "story"
})
export class StoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, user => user.stories, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @Column()
  title: string;

  @Column({
    name: "image_url"
  })
  imageUrl: string;

  @Column({
    name: "status"
  })
  status: StoryStatus = StoryStatus.Draft;

  @Column()
  slug: string;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;

  // relation
  @OneToMany(type => ItemEntity, item => item.storyId, {
    cascade: true
  })
  items: ItemEntity[]

  // hook
  @BeforeInsert()
  @BeforeUpdate()
  generateSlugFromName() {
    this.slug = _.chain(this.title)
      .thru(cleanAccents)
      .toLower()
      .split(" ")
      .concat(Date.now().toString())
      .join("-")
      .value()
  }
}