import { IsString } from 'class-validator';
export class CreateChatDto {
    @IsString()
    user_id:string;

    @IsString()
    mensaje:string;

    @IsString()
    fechaCreacion: string;
}
