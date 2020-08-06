import { UserType } from './user.dto';
import { StoryEntity } from '../story/story.entity';
import {
  BaseEntity, Entity,
  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column({ name: "user_type" })
  userType: string = UserType.Member;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(type => StoryEntity, story => story.userId)
  stories: StoryEntity[]
}