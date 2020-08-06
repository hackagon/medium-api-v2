import { IsEmail, IsNotEmpty, Validate, IsEmpty } from "class-validator";
import { IsUniqueEmail } from "../validator/IsUniqueEmail";

export enum UserType {
  Member = "Member",
  Admin = "Admin"
}

// Create
export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUniqueEmail, { message: "This email already exists" })
  email: string;

  @IsEmpty()
  userType: UserType;
}