import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { SeriesEntity } from './series.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService extends TypeOrmCrudService<SeriesEntity> {
  constructor(
    @InjectRepository(SeriesEntity) repo: Repository<SeriesEntity>
  ) {
    super(repo);
  }
}