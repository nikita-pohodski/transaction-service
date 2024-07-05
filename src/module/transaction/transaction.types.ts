export enum TransactionType {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export type FindTransactionParams = {
  userIds?: string[];
  ids?: string[];
  type?: TransactionType;
  status?: TransactionStatus;
  amounts?: string[];
  take?: number;
  skip?: number;
};

export enum TransactionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum BalanceChangedStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type EventTransactionSavedData = {
  userId: string;
  amount: string;
  transactionId: string;
  transactionType: TransactionType;
};

export type EventBalanceChangedData = {
  transactionId: string;
  status: BalanceChangedStatus;
};

export enum EventNameEnum {
  TransactionSaved = 'TransactionSaved',
  BalanceChanged = 'BalanceChanged',
}
