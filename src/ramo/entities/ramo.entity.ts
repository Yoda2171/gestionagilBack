
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'ramo'})
export class Ramo {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ramo:string;

    @OneToMany(() => Post, post => post.ramo_id)
    posts: Post[];


}
