import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ChangeBalanceParams } from './account.types';

@Injectable()
export class InternalAccountService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async changeBalance(params: ChangeBalanceParams): Promise<void> {
    const url = `${this.config.get('ACCOUNT_URL')}/user/balance`;
    const res = await this.httpService.axiosRef.post(url, { params });

    return res.data;
  }
}
