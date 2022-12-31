import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import * as request from 'supertest';

describe('Cats', () => {
  let app: INestApplication;
  const mailService = {
    getAll: () => [{}],
    getById: () => ({}),
    create: () => ({}),
    delete: () => true,
  };
  //TODO: Complete this
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MailModule],
    })
      .overrideProvider(MailService)
      .useValue(mailService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET mails`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: mailService.getAll(),
    });
  });

  it(`/GET mail by id`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: mailService.getById(),
    });
  });

  it(`/POST create mail`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: mailService.create(),
    });
  });

  it(`/DELETE mails`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: mailService.delete(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
