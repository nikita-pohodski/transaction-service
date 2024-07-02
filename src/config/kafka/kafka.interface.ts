export interface KafkaEvent<Data> {
  eventName: string;
  data: Data;
}
