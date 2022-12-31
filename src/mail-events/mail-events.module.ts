import { Module } from '@nestjs/common';
import { MailsEventsGateway } from './mail-events.gateway';

@Module({ providers: [MailsEventsGateway] })
export class MailEventsModule {}
