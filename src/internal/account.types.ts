import { TransactionType } from '../module/transaction/transaction.types';

export type ChangeBalanceParams = {
  userId: string;
  balance: string;
  transactionType: TransactionType;
};
