import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    body: string;
    
    @IsString()
    titulo:string;

    @IsString()
    fechaCreacion:string;

    @IsString()
    ramo_id:string;

    @IsString()
    user_id:string;

    

  

}
