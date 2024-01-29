import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@venomousmonkeycorp/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
