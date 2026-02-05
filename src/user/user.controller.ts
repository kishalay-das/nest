import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get('all')
    getAllUser() {
        return this.userService.getAllUser()
    }

    @Get(':id')
    getSingleUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id)
    }
    
    @Get(':id/greet')
    getMessage(@Param('id', ParseIntPipe) id: number){        
        return this.userService.getMessage(id)
    }
}
