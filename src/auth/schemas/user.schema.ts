import { Post } from "src/posts/schemas/post.schema";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum userRole {
    Admin = 'admin',
    User = 'user'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column({ unique: true})
    email: string

    @Column()
    password: string

    @Column({type: 'enum', enum: userRole, default:userRole.User})
    role: userRole

    @OneToMany(()=>Post, (Post)=>Post.authorName)
    posts: Post[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}