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
