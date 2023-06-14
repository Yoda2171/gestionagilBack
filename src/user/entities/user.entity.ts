import { IsString } from 'class-validator';
import {  Entity, Column,PrimaryGeneratedColumn   } from 'typeorm';


@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    correo:string;

    @Column()
    username:string;

    @Column() 
    password:string;    
}
