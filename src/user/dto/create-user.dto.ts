import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    
    foto:string;

    @IsString()
    @IsNotEmpty()
    correo:string;

    @IsString()
    @IsNotEmpty()
    password:string;   
    
}
