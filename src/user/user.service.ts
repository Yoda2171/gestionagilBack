import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-user.dto';
import { Chat } from 'src/chat/entities/chat.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(logindto: LoginDto) {
    const { correo, password } = logindto;

    try {
      const dataFind = await this.userRepository.findOne({ where: { correo } });

      if (!dataFind) {
        return {
          success: false,
          data: 'Usuario no encontrado',
        };
      }

      if (dataFind.password !== password) {
        return {
          success: false,
          data: 'Correo o contraseña Invalida',
        };
      }

      return {
        success: true,
        data: { ...dataFind },
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserMessages(userId: any): Promise<Chat[]> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.chat_id', 'chat')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      // Lanza una excepción o maneja el caso de usuario no encontrado según tu necesidad
    }

    const chats = user.chat_id;
    return chats;
  }
}
