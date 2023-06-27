import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';
import { ComentariosService } from 'src/comentarios/comentarios.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Post,Comentario,User])],
  controllers: [PostController],
  providers: [PostService,ComentariosService]
})
export class PostModule {}
