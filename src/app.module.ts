import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot('mongodb://root:passw0rd@localhost:27017', {
      dbName: 'mailer',
    }),
    MailModule,
  ],
})
export class AppModule {}
