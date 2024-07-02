import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { InternalAccountModule } from '../internal/account.module';

@Module({
  imports: [
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    InternalAccountModule,
  ],
})
export class AppModule {}
