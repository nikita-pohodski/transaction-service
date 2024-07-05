import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { GetTransactionFilterDto } from './dto/get-transaction-filter.dto';
import { TransactionDto } from './dto/transaction.dto';
import {
  BalanceChangedStatus,
  EventBalanceChangedData,
  EventNameEnum,
  EventTransactionSavedData,
  TransactionStatus,
  TransactionType,
} from './transaction.types';
import { InternalAccountService } from '../../internal/account.service';
import { KafkaService } from '../../config/kafka/kafka.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly internalAccountService: InternalAccountService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<void> {
    const { amount, transactionType, userId, recipient } = createTransactionDto;

    if (transactionType == TransactionType.TRANSFER && recipient) {
      return this.createTransferTransaction(createTransactionDto);
    }

    const transactionEntity = await this.transactionRepository.create({
      userId,
      amount,
      type: transactionType,
    });

    const data: EventTransactionSavedData = {
      userId,
      amount,
      transactionId: transactionEntity.id,
      transactionType,
    };

    this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data,
    });
  }

  async createTransferTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    const { amount, transactionType, userId, recipient } = createTransactionDto;

    const transactionWithdrawal = await this.transactionRepository.create({
      userId,
      amount: '-' + amount,
      type: transactionType,
    });

    const dataWithdrawal: EventTransactionSavedData = {
      userId,
      amount,
      transactionId: transactionWithdrawal.id,
      transactionType: TransactionType.WITHDRAWAL,
    };

    this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data: dataWithdrawal,
    });

    const transactionDeposit = await this.transactionRepository.create({
      userId: recipient,
      amount: amount,
      type: transactionType,
    });

    const dataDeposit: EventTransactionSavedData = {
      userId,
      amount,
      transactionId: transactionDeposit.id,
      transactionType: TransactionType.DEPOSIT,
    };

    this.kafkaService.produce({
      eventName: EventNameEnum.TransactionSaved,
      data: dataDeposit,
    });
  }

  async updateStatus(params: EventBalanceChangedData): Promise<void> {
    const { transactionId, status } = params;

    let transactionStatus = TransactionStatus.COMPLETED;
    if (status == BalanceChangedStatus.FAILED) {
      transactionStatus = TransactionStatus.FAILED;
    }

    await this.transactionRepository.updateStatus(
      transactionId,
      transactionStatus,
    );
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
