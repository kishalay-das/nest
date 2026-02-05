import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";

@Injectable()
export class PostExistPipe implements PipeTransform {
    constructor(private readonly postService: PostsService) { }

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            this.postService.findSinglePost(value)
        } catch (error) {
            throw new NotFoundException(`Post with this id ${value} is not available!`)
        }
        return value
    }
}