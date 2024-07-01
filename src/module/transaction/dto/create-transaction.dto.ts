import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransactionType } from '../transaction.types';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'User ID',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Amount in cents',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
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
    description: 'User ID if transaction is transfer type',
    required: false,
    type: String,
  })
  @IsString()
  @Expose()
  @IsOptional()
  recipient?: string;
}
