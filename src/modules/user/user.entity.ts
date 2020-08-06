import { UserType } from './user.dto';
import {
  BaseEntity, Entity,
  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn
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
}