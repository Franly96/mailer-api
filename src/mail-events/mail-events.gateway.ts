import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { INewMailBody } from './interfaces/NewMail.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MailsEventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMail')
  onNewMail(@MessageBody() body: INewMailBody) {
    console.log(body);
    body.addresses.forEach((email) => {
      this.server.emit(email, body.mail);
    });
  }
}
