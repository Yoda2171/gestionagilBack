import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post)
    private postRepository:Repository<Post>
  ){}

  create(createPostDto: CreatePostDto) {

    
    const newPost = this.postRepository.create(createPostDto)

    return this.postRepository.save(newPost)
  }

  findAllByRamo(id:any) {
    return this.postRepository.find({where:{ramo_id:id}})
  }

  findAll() {
    try{
      return this.postRepository.find({relations:['user_id','ramo_id']});
    }catch(error){
      console.log(error)
    }
  
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
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
