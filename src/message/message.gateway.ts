import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Socket;

  // @SubscribeMessage('message')
  // handleEvent(
  //   @MessageBody() message: CreateMessageDto,
  //   // @ConnectedSocket() client: Socket,
  // ): void {
  //   this.server.emit('message', 'hi ' + message.text);
  // }

  // @SubscribeMessage('connection')
  // handleEvent(
  //   @MessageBody() user: string,
  //   // @ConnectedSocket() client: Socket,
  // ): void {
  //     console.log(`${user} is now online`);
  //   // this.server.emit('connect', 'hi ' + message.text);
  // }

  // @SubscribeMessage('connection')
  // handleEvent(client: Socket): void {
  //     console.log(`${user} is now online`);
  // }
}
