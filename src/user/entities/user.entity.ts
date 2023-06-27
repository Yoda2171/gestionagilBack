import { IsString } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import {  Entity, Column,PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne   } from 'typeorm';
import { Comentario } from '../../comentarios/entities/comentario.entity';
import { Chat } from 'src/chat/entities/chat.entity';


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

    @OneToMany(() => Comentario, (comentario:Comentario) => comentario.user_id)
    comentarios_id: Comentario[];

    @OneToMany(() => Chat, (chat:Chat) => chat.user_id)
    chat_id: Chat[];

    @OneToMany(() => Chat, (chat:Chat) => chat.current_user_id)
    current_chat_id: Chat[];

}
