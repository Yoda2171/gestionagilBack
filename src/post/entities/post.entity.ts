
import { Ramo } from 'src/ramo/entities/ramo.entity';
import { User } from 'src/user/entities/user.entity';
import {  Entity, Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn   } from 'typeorm';


@Entity({name:'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo:string;

    @Column()
    body: string;

    @Column()
    fechaCreacion: string;

    @ManyToOne(() => User,(user:User) => user.posts_id,{onUpdate:'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user_id:string;

    @ManyToOne(() => Ramo, ramo => ramo.posts)
    @JoinColumn({name:'ramo_id'})
    ramo_id:string;

    

}
