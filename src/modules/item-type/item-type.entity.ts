import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import * as _ from 'lodash';

@Entity()
export class ItemType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  label: string;

  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;

  constructor(partial: Partial<ItemType>) {
    super();
    _.assign(this, partial);
  }
}
