import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { SeriesStatus } from './series.dto';
import * as _ from "lodash";
import { cleanAccents } from "../../utils/handleString";

@Entity({
  name: "series"
})
export class SeriesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string = "";

  @Column({ name: "image_url", nullable: true })
  imageUrl: string;

  @Column()
  status: SeriesStatus = SeriesStatus.Draft;

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