import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'chat'})
export class Chat {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    mensaje:string;

    @Column()
    fechaCreacion: string;

    @ManyToOne(() => User, (user:User) => user.chat_id,{onUpdate:'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user_id: User;

    @ManyToOne(() => User, (user:User) => user.current_chat_id,{onUpdate:'CASCADE', onDelete:'CASCADE'})
    @JoinColumn({name:'current_user_id'})
    current_user_id: User;


}
