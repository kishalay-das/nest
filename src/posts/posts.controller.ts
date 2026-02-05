import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistPipe } from './pipes/post-exist.pipe';
import { Post as postEntitry } from './schemas/post.schema';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }
    @Get()
    async getAllPost(@Query('search') search?: string): Promise<postEntitry[]> {
        const posts = await this.postService.findAllPost()
        if (search) {
            return posts.filter((post) => post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        }
        return posts
    }

    @Get(":id")
    async getSinglePost(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<postEntitry> {
        return await this.postService.findSinglePost(id)
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Body() createPostData: CreatePostDto): Promise<postEntitry> {
        return await this.postService.createPost(createPostData)
    }

    @Put(':id')
    async updatePost(@Param('id', ParseIntPipe, PostExistPipe) id: number, @Body() updatedPostData: UpdatePostDto) {
        await this.postService.updatePost(id, updatedPostData)
    }

    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<void> {
        await this.postService.deletePost(id)
    }
}
