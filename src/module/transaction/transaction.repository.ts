import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FindTransactionParams } from './transaction.types';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create<T extends DeepPartial<TransactionEntity>>(
    entity: T,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(entity);
  }

  async findById(id: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOneBy({ id });
  }

  async findAndCount(
    params: FindTransactionParams,
  ): Promise<{ items: TransactionEntity[]; total: number }> {
    const [items, total] = await this.queryBuilder(params).getManyAndCount();
    return { items, total };
  }

  queryBuilder(
    params: FindTransactionParams = {},
    alias = 'transaction',
  ): SelectQueryBuilder<TransactionEntity> {
    const query = this.transactionRepository.createQueryBuilder(alias);

    if (params?.userIds?.length) {
      query.andWhere(`${alias}.userId in (:...userIds)`, {
        userIds: params.userIds,
      });
    }

    if (params?.ids?.length) {
      query.andWhere(`${alias}.id in (:...ids)`, {
        phones: params.ids,
      });
    }

    if (params?.amounts?.length) {
      query.andWhere(`${alias}.amount in (:...amounts)`, {
        phones: params.amounts,
      });
    }

    if (params?.type) {
      query.andWhere(`${alias}.type = :type`, {
        login: params.type,
      });
    }

    //Paginate
    if (params.take) query.take(params.take);
    if (params.skip) query.skip(params.skip);

    return query;
  }
}
