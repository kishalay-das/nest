import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string


    @IsNotEmpty()
    @IsEmail()
    @MinLength(4)
    @MaxLength(20)
    email: string


    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        {
            message:
                'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
        },
    )
    password: string
}