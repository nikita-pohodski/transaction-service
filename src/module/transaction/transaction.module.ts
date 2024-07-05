import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { DatabaseModule } from '../database/database.module';
import { InternalAccountModule } from '../../internal/account.module';
import { KafkaModule } from '../../config/kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionKafkaController } from './transaction.kafka-controller';

@Module({
  controllers: [TransactionController, TransactionKafkaController],
  providers: [TransactionService, TransactionRepository],
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    DatabaseModule,
    InternalAccountModule,
    KafkaModule,
    ConfigModule,
  ],
})
export class TransactionModule {}
