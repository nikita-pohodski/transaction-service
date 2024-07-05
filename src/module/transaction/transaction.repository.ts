import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FindTransactionParams, TransactionStatus } from './transaction.types';

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

  async updateStatus(id: string, status: TransactionStatus): Promise<void> {
    await this.transactionRepository.update({ id }, { status });
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
        ids: params.ids,
      });
    }

    if (params?.amounts?.length) {
      query.andWhere(`${alias}.amount in (:...amounts)`, {
        amounts: params.amounts,
      });
    }

    if (params?.type) {
      query.andWhere(`${alias}.type = :type`, {
        type: params.type,
      });
    }

    if (params?.status) {
      query.andWhere(`${alias}.status = :status`, {
        status: params.status,
      });
    }

    //Paginate
    if (params.take) query.take(params.take);
    if (params.skip) query.skip(params.skip);

    return query;
  }
}
