import { TransactionService } from './transaction.service';
import { Controller } from '@nestjs/common';
import { EventBalanceChangedData, EventNameEnum } from './transaction.types';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class TransactionKafkaController {
  constructor(private readonly transactionService: TransactionService) {}

  @EventPattern(EventNameEnum.BalanceChanged)
  async handleTransactionSaved(
    @Payload() message: EventBalanceChangedData,
  ): Promise<void> {
    await this.transactionService.updateStatus(message);
  }
}
