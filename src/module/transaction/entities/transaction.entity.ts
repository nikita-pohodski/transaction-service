import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../transaction.types';

@Entity({ name: 'transaction' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Transaction ID',
    name: 'transaction_id',
  })
  readonly id: string;

  @Column('varchar', {
    comment: 'ID of the user who makes the transaction',
    nullable: false,
  })
  userId: string;

  @Column('varchar', {
    comment: 'Amount of transaction in cents',
    nullable: false,
  })
  amount: string;

  @Column('enum', {
    comment: 'Transaction type',
    name: 'type',
    nullable: false,
    enum: TransactionType,
  })
  type: TransactionType;
}
