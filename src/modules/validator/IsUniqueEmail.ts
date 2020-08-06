import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueEmail implements ValidatorConstraintInterface {
  async validate(email: any, args: ValidationArguments) {
    const entityManager = getManager()
    return entityManager
      .findOne(UserEntity, { email })
      .then(user => {
        if (user) return false;
        return true;
      });
  }
}
