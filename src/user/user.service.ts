import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
   private userRepository:Repository<User>
  ){}

  async login(logindto: LoginDto){
    const { correo,password} = logindto;

    try{
      const dataFind = await this.userRepository.findOne({where:{correo}});

      if(!dataFind){
        return {
          success:false,
          data:'Usuario no encontrado',
        }
      }

      if(dataFind.password !== password){
        return{
          success:false,
          data:'Correo o contraseña Invalida'
        }
      }

      return{
        success:true,
        data:{...dataFind}
      }


    }catch(error){
      return{
        success: false,
        data:error,
      }
    }

  }





  create(createUserDto: CreateUserDto) {
   const newUser= this.userRepository.create(createUserDto)

   return this.userRepository.save(newUser)
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({id},updateUserDto)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
