import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailService } from './mail.service';
import { Mail } from './schemas/mail.schema';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async GetAll(): Promise<Mail[]> {
    return await this.mailService.getAll();
  }

  @Post()
  async Create(@Body() createMailDto: CreateMailDto): Promise<Mail> {
    return await this.mailService.create(createMailDto);
  }
}
