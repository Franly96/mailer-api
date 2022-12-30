import { CreateMailDto } from '../dto/create-mail.dto';
import { DeleteMailDto } from '../dto/delete-mail.dto';
import { GetMailParams } from './getMail.params.interface';
import { Mail } from './mail.interface';

export interface MailServiceInterface {
  getAll(params: GetMailParams): Promise<Mail[]>;
  getById(id: string): Promise<Mail | null>;
  create(createMailDto: CreateMailDto): Promise<Mail>;
  delete(deleteMailDto: DeleteMailDto): Promise<boolean>;
}
