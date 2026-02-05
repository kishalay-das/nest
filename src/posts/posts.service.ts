import { Injectable, NotFoundException } from '@nestjs/common';
// import { IPost } from './interfaces/post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './schemas/post.schema';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    // private posts: IPost[] = [
    //     {
    //         id: 1,
    //         title: "First Post Title",
    //         content: "First Post Title based Content",
    //         authorName: "Kishalay",
    //         createdAt: new Date()
    //     },
    //     {
    //         id: 2,
    //         title: "Second Post Title",
    //         content: "Second Post Title based Content",
    //         authorName: "Suman",
    //         createdAt: new Date()
    //     },
    // ]

    constructor(@InjectRepository(Post) private postRepositry: Repository<Post>){}

    async findAllPost(): Promise<Post[]> {
        return await this.postRepositry.find()
    }

    async findSinglePost(id: number): Promise<Post> {
        const post = await this.postRepositry.findOneBy({id})
        if (!post) {
            throw new NotFoundException('No post found with this id')
        }
        return post
    }

    async createPost(createPostData: CreatePostDto):Promise<Post> {
        const newPost = await this.postRepositry.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName: createPostData.authorName
        })
        return this.postRepositry.save(newPost)
    }

    async updatePost(id: number, updatePostData: UpdatePostDto): Promise<Post>{
        const findPostToUpdate = await this.findSinglePost(id)

        if (findPostToUpdate.title) {
            findPostToUpdate.title = updatePostData.title
        }

        if (findPostToUpdate.content) {
            findPostToUpdate.content = updatePostData.content
        }

        if (findPostToUpdate.authorName) {
            findPostToUpdate.authorName = updatePostData.authorName
        }

        return this.postRepositry.save(findPostToUpdate)
    }

    async deletePost(id: number): Promise<void> {
        const post = await this.findSinglePost(id)
        await this.postRepositry.remove(post)
    }

    // private generateId(): number {
    //     return this.posts.length > 0 ? Math.max(...this.posts.map((p) => p.id)) + 1 : 1
    // }
}
