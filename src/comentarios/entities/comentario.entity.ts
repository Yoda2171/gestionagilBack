import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'comentario'})
export class Comentario {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    comentario:string;

    @Column()
    fechaCreacion: string;

    @ManyToOne(() => User,(user:User) => user.comentarios_id,{onUpdate:'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user_id:string;

    @ManyToOne(() => Post, post => post.comentarios_id,{onUpdate:'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'post_id'})
    post_id:string;




}
