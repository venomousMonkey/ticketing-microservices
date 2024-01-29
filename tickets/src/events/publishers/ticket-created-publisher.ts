import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@venomousmonkeycorp/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
