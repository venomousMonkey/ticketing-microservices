import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from '@venomousmonkeycorp/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
