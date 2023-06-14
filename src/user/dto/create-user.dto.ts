import { IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    username:string;

    @IsString()
    correo:string;

    @IsString()
    password:string;   
    
}
