import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionStatus, TransactionType } from '../transaction.types';

export class TransactionDto {
  @ApiProperty({
    description: 'Transaction ID',
    type: String,
  })
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({
    description: 'User ID',
    type: String,
  })
  @IsString()
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Amount in cents',
    type: String,
  })
  @IsString()
  @Expose()
  amount: string;

  @ApiProperty({
    description: 'Transaction type',
    required: false,
    enum: TransactionType,
  })
  @Expose()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @ApiProperty({
    description: 'Transaction status',
    required: false,
    enum: TransactionStatus,
  })
  @Expose()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  constructor(entity: Partial<TransactionEntity>) {
    return plainToInstance(TransactionDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
