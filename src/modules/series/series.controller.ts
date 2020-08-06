import { Controller } from "@nestjs/common";
import { SeriesService } from './series.service';
import { Crud } from '@nestjsx/crud';
import { SeriesEntity } from './series.entity';
import { CreateSeriesDTO, UpdateSeriesDTO, ReplaceSeriesDTO } from './series.dto';

@Crud({
  model: {
    type: SeriesEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
  dto: {
    create: CreateSeriesDTO,
    update: UpdateSeriesDTO,
    replace: ReplaceSeriesDTO
  },
  routes: {
    deleteOneBase: {
      interceptors: [],
      decorators: [],
      returnDeleted: true,
    },
  },
})
@Controller("/series")
export class SeriesController {
  constructor(
    public service: SeriesService
  ) { }
}