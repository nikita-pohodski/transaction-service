import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { InternalAccountService } from './account.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [InternalAccountService],
  exports: [InternalAccountService],
})
export class InternalAccountModule {}
