export enum TransactionType {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export type FindTransactionParams = {
  userIds?: string[];
  ids?: string[];
  type?: TransactionType;
  amounts?: string[];
  take?: number;
  skip?: number;
};
