import { Controller, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async Chat(@Res() res) {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }

    @Get('user/:id') 
    async ChatByUser(@Res() res, id: string) {
        const messages = await this.chatService.getUserMessages(id);
        res.json(messages);
    }

}
