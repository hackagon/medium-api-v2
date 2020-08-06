import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesEntity } from './series.entity';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeriesEntity]),
  ],
  providers: [SeriesService],
  controllers: [SeriesController]
})
export class SeriesModule { };