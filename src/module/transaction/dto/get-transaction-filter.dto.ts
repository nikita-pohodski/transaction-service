import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionStatus, TransactionType } from '../transaction.types';

export class GetTransactionFilterDto {
  @ApiProperty({
    description: 'Transaction IDs',
    type: [String],
  })
  @IsOptional()
  @IsString()
  readonly ids?: string[];

  @ApiProperty({
    description: 'User IDs',
    type: [String],
  })
  @IsOptional()
  @IsString()
  readonly userIds?: string[];

  @ApiProperty({
    description: 'Amounts',
    type: [String],
  })
  @IsOptional()
  @IsString()
  readonly amounts?: string[];

  @ApiProperty({
    description: 'Transaction type',
    required: false,
    enum: TransactionType,
  })
  @IsOptional()
  @IsEnum(TransactionType)
  readonly transactionType?: TransactionType;

  @ApiProperty({
    description: 'Transaction status',
    required: false,
    enum: TransactionStatus,
  })
  @IsOptional()
  @IsEnum(TransactionStatus)
  readonly status?: TransactionStatus;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly take?: number;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly skip?: number;
}
