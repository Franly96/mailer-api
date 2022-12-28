import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { CreateMailDto } from './dto/create-mail.dto';
import { DeleteMailDto } from './dto/delete-mail.dto';
import { MailService } from './mail.service';
import { Mail } from './schemas/mail.schema';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async GetAll(): Promise<Mail[]> {
    return await this.mailService.getAll();
  }

  @Get(':id')
  async GetById(
    @Param() params: { id: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<Mail | []> {
    const mail = await this.mailService.getById(params.id);
    if (mail) {
      return mail;
    } else {
      res.status(HttpStatus.NOT_FOUND);
      return [];
    }
  }

  @Post()
  async Create(@Body() createMailDto: CreateMailDto): Promise<Mail> {
    return await this.mailService.create(createMailDto);
  }

  @Delete()
  async Delete(@Body() deleteMailDTO: DeleteMailDto): Promise<boolean> {
    return await this.mailService.delete(deleteMailDTO);
  }
}
