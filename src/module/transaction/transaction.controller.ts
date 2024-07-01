import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionFilterDto } from './dto/get-transaction-filter.dto';
import { TransactionDto } from './dto/transaction.dto';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll(
    @Query() query: GetTransactionFilterDto,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    return this.transactionService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TransactionDto> {
    return this.transactionService.findOne(id);
  }
}
