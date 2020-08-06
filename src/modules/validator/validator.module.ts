import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsUniqueEmail } from "./IsUniqueEmail";
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [IsUniqueEmail]
})
export class ValidatorModule { }