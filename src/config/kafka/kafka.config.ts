import { KafkaOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

const ENV_FILE = '.env';

dotenv.config({ path: ENV_FILE });

export const kafkaOptionsFactory = (): KafkaOptions => {
  const options: KafkaOptions['options'] = {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: process.env.KAFKA_CLIENT_BROKERS.split(','),
    },
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
    },
    subscribe: {
      fromBeginning: true,
    },
  };

  return { transport: Transport.KAFKA, options };
};
