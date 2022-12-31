import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { Mail, MailSchema } from './schemas/mail.schema';

describe('MailController', () => {
  let controller: MailController;
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        MailService,
        { provide: getModelToken(Mail.name), useValue: MailSchema },
      ],
    }).compile();
    service = module.get<MailService>(MailService);
    controller = module.get<MailController>(MailController);
  });

  it('should return a list of mails', async () => {
    const result: any[] = [
      {
        from: 'me',
        addresses: ['to', 'me'],
        message: 'Hello world',
        subject: 'Hello world',
      },
    ];
    jest.spyOn(service, 'getAll').mockImplementation(() => result as any);
    expect(await controller.GetAll({})).toBe(result);
  });

  it('should return a mail', async () => {
    const response: Partial<Response> = {
      json: jest.fn().mockImplementation(),
    };

    const result = {
      from: 'me',
      addresses: ['to', 'me'],
      message: 'Hello world',
      subject: 'Hello world',
    };

    jest.spyOn(service, 'getById').mockImplementation(() => result as any);
    expect(
      await controller.GetById({ id: 'testid' }, response as Response),
    ).toBe(result);
  });

  it('should create a mail', async () => {
    const toCreateObject = {
      from: 'me',
      addresses: ['to', 'me'],
      message: 'Hello world',
      subject: 'Hello world',
    };

    const result = {
      id: '123',
      from: 'me',
      addresses: ['to', 'me'],
      message: 'Hello world',
      subject: 'Hello world',
    };
    jest.spyOn(service, 'create').mockImplementation(() => result as any);
    expect(await controller.Create(toCreateObject)).toBe(result);
  });

  it('should delete a mail', async () => {
    const toDelete = { id: '123' };
    const result = true;
    jest.spyOn(service, 'delete').mockImplementation(() => result as any);
    expect(await controller.Delete(toDelete)).toBe(result);
  });
});
