import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';

@Controller("/users")
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Get("/")
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @Post("/")
  async createUser(@Body() data: CreateUserDTO) {
    return await this.userService.createUser(data);
  }
}