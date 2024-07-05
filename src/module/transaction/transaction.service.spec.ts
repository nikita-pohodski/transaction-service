import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { KafkaService } from '../../config/kafka/kafka.service';
import { EventNameEnum, TransactionType } from './transaction.types';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { mock } from 'jest-mock-extended';
import { InternalAccountService } from '../../internal/account.service';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let kafkaService: KafkaService;
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: InternalAccountService,
          useValue: mock<InternalAccountService>(),
        },
        {
          provide: KafkaService,
          useValue: {
            produce: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionService = module.get(TransactionService);
    transactionRepository = module.get(TransactionRepository);
    kafkaService = module.get(KafkaService);
  });

  describe('create', () => {
    it('should create transaction', async () => {
      const createTransactionDto: CreateTransactionDto = {
        amount: '100',
        userId: 'userId',
        transactionType: TransactionType.DEPOSIT,
      };

      const createdTransaction: TransactionEntity = {
        id: 'id',
        amount: '100',
        userId: 'userId',
        type: TransactionType.DEPOSIT,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(transactionRepository, 'create')
        .mockResolvedValue(createdTransaction);
      jest.spyOn(kafkaService, 'produce').mockImplementation();

      await transactionService.create(createTransactionDto);

      expect(transactionRepository.create).toHaveBeenCalledWith({
        userId: createTransactionDto.userId,
        amount: createTransactionDto.amount,
        type: createTransactionDto.transactionType,
      });
      expect(kafkaService.produce).toHaveBeenCalledWith({
        eventName: EventNameEnum.TransactionSaved,
        data: {
          userId: createTransactionDto.userId,
          amount: createTransactionDto.amount,
          transactionId: createdTransaction.id,
          transactionType: createTransactionDto.transactionType,
        },
      });
    });
  });
});
