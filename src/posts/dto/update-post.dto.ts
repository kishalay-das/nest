import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdatePostDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    title: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(15)
    content: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(15)
    authorName: string

}