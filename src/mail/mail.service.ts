import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailDto } from './dto/create-mail.dto';
import { DeleteMailDto } from './dto/delete-mail.dto';
import { GetMailParams } from './interfaces/getMail.params.interface';
import { MailServiceInterface } from './interfaces/mail.service.interface';
import { Mail } from './schemas/mail.schema';

@Injectable()
export class MailService implements MailServiceInterface {
  constructor(@InjectModel(Mail.name) private mailModel: Model<Mail>) {}

  async getAll(params: GetMailParams): Promise<Mail[]> {
    const { inbox, from, deleted } = params;
    let query = null;
    if (deleted) {
      query = { delete_at: { $ne: null } };
    } else {
      query = { delete_at: null };
    }
    if (inbox) {
      query = { ...query, addresses: inbox };
    }
    if (from) {
      query = { ...query, from: from };
    }

    return await this.mailModel
      .find({ ...query })
      .sort({ created_at: -1 })
      .exec();
  }

  async getById(id: string): Promise<Mail | null> {
    return await this.mailModel.findById(id).exec();
  }

  async create(createMailDto: CreateMailDto): Promise<Mail> {
    const createdMail = new this.mailModel(createMailDto);
    return createdMail.save();
  }

  async delete(deleteMailDto: DeleteMailDto): Promise<boolean> {
    const deleted = await this.mailModel
      .findOneAndUpdate({ _id: deleteMailDto.id }, { delete_at: Date.now() })
      .sort({ delete_at: -1 })
      .exec();
    return !!!deleted;
  }
}
