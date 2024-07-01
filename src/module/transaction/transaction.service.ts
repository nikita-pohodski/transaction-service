import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { GetTransactionFilterDto } from './dto/get-transaction-filter.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionType } from './transaction.types';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<void> {
    const { amount, transactionType, userId, recipient } = createTransactionDto;

    if (transactionType == TransactionType.TRANSFER && recipient) {
      return this.createTransferTransaction(createTransactionDto);
    }

    await this.transactionRepository.create({
      userId,
      amount,
      type: transactionType,
    });
  }

  async createTransferTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    const { amount, transactionType, userId, recipient } = createTransactionDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction('READ COMMITTED');

    try {
      await this.transactionRepository.create({
        userId,
        amount: '-' + amount,
        type: transactionType,
      });

      await this.transactionRepository.create({
        userId: recipient,
        amount: amount,
        type: transactionType,
      });

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findAll(filterDto: GetTransactionFilterDto): Promise<{
    items: TransactionDto[];
    total: number;
  }> {
    const { total, items: transactions } =
      await this.transactionRepository.findAndCount(filterDto);

    return {
      items: transactions.map((transaction) => new TransactionDto(transaction)),
      total,
    };
  }

  async findOne(id: string): Promise<TransactionDto> {
    const transactionEntity = await this.transactionRepository.findById(id);
    return new TransactionDto(transactionEntity);
  }
}
