import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailEventsModule } from './mail-events/mail-events.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_HOST_URI || '', {
      dbName: 'mailer',
    }),
    MailModule,
    MailEventsModule,
  ],
})
export class AppModule {}
