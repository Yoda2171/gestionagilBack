import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { type } from 'os';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private comentarioRepository: Repository<Comentario>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //agregar comentario a un post
  async createComentario(id: any, createComentarioDto: CreateComentarioDto) {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['user_id', 'ramo_id', 'comentarios_id'],
    });
    const newComentario = this.comentarioRepository.create(createComentarioDto);

    return this.comentarioRepository.save(newComentario);
  }

  //dame los todos los comentarios de un unico post mandando todos los datos de los comentarios
  async findAllComentsPost(id: any) {
    const results = await this.postRepository
    .createQueryBuilder('post')
    .select([
      'post.id AS "id"',
      'post.titulo AS "titulo"',
      'post.body AS "body"',
      'post.user_id AS "post_user_id"',
      'postUser.username AS "postUser_username"',
      'postUser.foto AS "postUser_foto"' ,
      'post.fechaCreacion AS "post_fechaCreacion"',
      'post.ramo_id AS "ramo_id"',
      'ramo.ramo AS "ramo_nombre"',
      'comentario.id AS "comentario_id"',
      'comentario.comentario AS "comentario"',
      'comentario.fechaCreacion AS "comentario_fechaCreacion"',
      'comentario.user_id AS "comentario_user_id"',
      'users.username AS "comentario_user_username"',
      'users.foto AS "comentario_user_foto"',
    ])
    .innerJoin('post.comentarios_id', 'comentario')
    .innerJoin('comentario.user_id', 'users')
    .innerJoin('post.ramo_id', 'ramo')
    .innerJoin('users', 'postUser', 'post.user_id = postUser.id')
    .where('post.id = :id', { id })
    .getRawMany();

  const post = {
    id: results[0].id,
    titulo: results[0].titulo,
    body: results[0].body,
    fechaCreacion:results[0].post_fechaCreacion,
    user_id: {
      id: results[0].post_user_id,
      // Agrega aquí las propiedades del usuario del post que deseas incluir
      username: results[0].postUser_username,
      foto: results[0].postUser_foto,
    },
    ramo_id: {
      id: results[0].ramo_id,
      // Agrega aquí las propiedades del ramo que deseas incluir
      ramo: results[0].ramo_nombre,
    },
    comentarios_id: results.map((result) => ({
      id: result.comentario_id,
      comentario: result.comentario,
      fechaCreacion: result.comentario_fechaCreacion,
      user_id: result.comentario_user_id,
      username: result.comentario_user_username,
      foto: result.comentario_user_foto,
    })),
  };

  return {
    post,
  };
  }

  findOne(id: any) {
    return 'dfiasihi';
  }

  update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
