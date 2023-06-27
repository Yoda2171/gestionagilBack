import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async createMessage(chat: Chat): Promise<Chat> {
    return await this.chatRepository.save(chat);
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.find({relations:['user_id']});
  }


  //obtener los mensajes que le realizaron al usuario
  async getMessagesByUser(id: any): Promise<Chat[]> {
    return await this.chatRepository.find({where:{user_id:id},relations:['user_id']});
  }

  async getUserMessages(userId: any): Promise<Chat[]> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.chat_id;
  }

  


}
