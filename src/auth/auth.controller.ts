import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { jwtAuthGuard } from './guards/jwt-auth.guards';
import { currentUser } from './decoraters/current-user.decoraters';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() registerData: RegisterDto){
        return this.authService.regsiterUser(registerData)
    }

    @Post('login')
    login(@Body() loginData: LoginDto){
        return this.authService.loginUser(loginData)
    }

    @Post('refresh_token')
    refreshToken(@Body('refresh_token') refresh_token: string){
        return this.authService.refreshToken(refresh_token)
    }

    @UseGuards(jwtAuthGuard)
    @Get('profile')
    getProfile(@currentUser() user: any){
        return user
    }
}
