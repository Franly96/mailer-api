import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailDto } from './dto/create-mail.dto';
import { Mail } from './schemas/mail.schema';

@Injectable()
export class MailService {
  constructor(@InjectModel(Mail.name) private mailModel: Model<Mail>) {}

  async getAll(): Promise<Mail[]> {
    return await this.mailModel.find().exec();
  }

  async create(createMailDto: CreateMailDto): Promise<Mail> {
    const createdMail = new this.mailModel(createMailDto);
    return createdMail.save();
  }
}
