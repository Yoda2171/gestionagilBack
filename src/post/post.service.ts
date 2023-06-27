import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);

    return this.postRepository.save(newPost);
  }

  findAllByRamo(id: any) {
    return this.postRepository.find({ where: { ramo_id: id } });
  }

  async findAll() {
    /*  try{
      return this.postRepository.find({relations:['user_id','ramo_id','comentarios_id']});
    }catch(error){
      console.log(error)
    } */

    const posts = await this.postRepository
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
      .leftJoin('post.comentarios_id', 'comentario')
      .leftJoin('comentario.user_id', 'users')
      .innerJoin('post.ramo_id', 'ramo')
      .innerJoin('users', 'postUser', 'post.user_id = postUser.id')
      .orderBy('post.id')
      .getRawMany();

    const postsMap = new Map<number, any>();

    posts.forEach((result: any) => {
      const postId = result.id;

      if (postsMap.has(postId)) {
        const post = postsMap.get(postId);
        post.comentarios_id.push({
          id: result.comentario_id,
          comentario: result.comentario,
          fechaCreacion: result.comentario_fechaCreacion,
          user_id: result.comentario_user_id,
          username: result.comentario_user_username,
          foto: result.comentario_user_foto,
        });
      } else {
        const post = {
          id: result.id,
          titulo: result.titulo,
          body: result.body,
          user_id: {
            id: result.post_user_id,
            username: result.postUser_username,
            foto: result.postUser_foto,
          },
         
          ramo_id: {
            id: result.ramo_id,
            ramo: result.ramo_nombre,
          },
          comentarios_id: [],
        };
        if (result.comentario_id) {
          post.comentarios_id.push({
            id: result.comentario_id,
            comentario: result.comentario,
            fechaCreacion: result.comentario_fechaCreacion,
            user_id: result.comentario_user_id,
            username: result.comentario_user_username,
            foto: result.comentario_user_foto,
          });
        }
        postsMap.set(postId, post);
      }
    });

    const postsArray = Array.from(postsMap.values());

    return postsArray;
  }

  findOne(id: any) {
    return this.postRepository.findOne({
      where: { id: id },
      relations: ['user_id', 'ramo_id', 'comentarios_id'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    /* const post = this.postRepository.findOne(id)
    return this.postRepository.save({...post,...updatePostDto})
     */
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
