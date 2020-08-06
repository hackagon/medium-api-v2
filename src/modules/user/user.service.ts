import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { CreateUserDTO } from './user.dto';
import { StoryEntity } from '../story/story.entity';
import { StoryRepository } from '../story/story.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(StoryRepository) private storyRepo: StoryRepository
  ) {
  }

  async createUser(data: CreateUserDTO): Promise<UserEntity> {
    const newUser = this.userRepo.create(data);
    newUser.save()
    return newUser;
  }

  async getUserById(id: number): Promise<UserEntity> {
    const foundUser = await this.userRepo.findOne(id);
    if (!foundUser) throw new NotFoundException("User not found")
    return foundUser
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  async getStoriesByUserId(id: number): Promise<StoryEntity[]> {
    return this.storyRepo.find({
      where: {
        userId: id
      }
    })
  }
}