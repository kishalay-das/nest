import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    title: string

    @IsNotEmpty()
    @IsString()
    @MinLength(15)
    content: string

    @IsNotEmpty()
    @IsString()
    authorName: string

}