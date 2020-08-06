import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemTypeRepository } from './item-type.repository';
import { ItemType } from './item-type.entity';
import { getConnection } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as BBPromise from 'bluebird';

@Injectable()
export class ItemTypeService implements OnModuleInit {
  constructor(
    @InjectRepository(ItemTypeRepository)
    private itemTypeRepository: ItemTypeRepository,
  ) { }

  async onModuleInit() {
    const sqlPath = path.join(
      __dirname,
      '../../../sql/init_item_type_records.sql',
    );

    const queries = _.chain(sqlPath)
      .thru(val => {
        return fs.readFileSync(val, { encoding: 'utf8' }).toString();
      })
      .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
      .replace(/\s+/g, ' ') // excess white space
      .split(';')
      .filter()
      .value();

    await BBPromise.map(queries, (sqlQuery: string) => getConnection().query(sqlQuery));
  }

  async getItemTypes(): Promise<ItemType[]> {
    return await this.itemTypeRepository.find();
  }

  async getItemTypeById(id: number): Promise<ItemType> {
    return await this.itemTypeRepository.findOne(id);
  }
}
