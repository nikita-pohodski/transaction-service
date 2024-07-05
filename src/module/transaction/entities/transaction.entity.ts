import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionStatus, TransactionType } from '../transaction.types';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity({ name: 'transaction' })
export class TransactionEntity extends AbstractEntity {
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

  @Column('enum', {
    comment: 'Transaction status',
    name: 'status',
    nullable: false,
    enum: TransactionStatus,
    default: TransactionStatus.IN_PROGRESS,
  })
  status?: TransactionStatus;
}
