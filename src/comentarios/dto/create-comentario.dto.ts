import { IsString } from "class-validator";
import { Post } from "src/post/entities/post.entity";

export class CreateComentarioDto {

    @IsString()
    user_id:string;

    @IsString()
    post_id:string;

    @IsString()
    comentario:string;

    @IsString()
    fechaCreacion: string;
}
