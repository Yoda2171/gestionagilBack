import { IsString } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import {  Entity, Column,PrimaryGeneratedColumn, OneToMany, ManyToMany   } from 'typeorm';


@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    correo:string;

    @Column()
    username:string;

    @Column() 
    foto:string; 

    @Column() 
    password:string;    

    @OneToMany(() => Post, (post:Post) => post.user_id)
    posts_id: Post[];

}
