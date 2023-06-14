import {  Entity, Column,PrimaryGeneratedColumn   } from 'typeorm';


@Entity({name:'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    comentarios:string;

    @Column()
    likes:number;

    @Column()
    imagen: string;
    
}
