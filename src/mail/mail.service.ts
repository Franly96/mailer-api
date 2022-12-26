import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  getAll(): string {
    return 'Gets All Mails';
  }
}
