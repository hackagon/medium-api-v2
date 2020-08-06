import { EntityRepository, Repository } from 'typeorm';
import { ItemType } from './item-type.entity';

@EntityRepository(ItemType)
export class ItemTypeRepository extends Repository<ItemType> { }
