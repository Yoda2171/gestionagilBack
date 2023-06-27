import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ComentariosService } from 'src/comentarios/comentarios.service';
import { CreateComentarioDto } from 'src/comentarios/dto/create-comentario.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService,
    private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Post(':id')
  createComentario(@Param('id') id: string, @Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.createComentario(id,createComentarioDto);
  }
  

  //dame los comentarios de un post
  @Get(':id/comentarios')
  findAllComentarios(@Param('id',ParseIntPipe) id: number) {
    return this.comentariosService.findAllComentsPost(id);
  }

  

  /* @Get('ramo/:id')
  findAllByRamo(@Param('id') id: any) {
    return this.postService.findAllByRamo(id);
  } */


  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  /* @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  } */

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.postService.remove(+id);
  }
}
