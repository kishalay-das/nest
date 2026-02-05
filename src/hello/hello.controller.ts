import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService:HelloService){}
    @Get()
    getHello(){
        return this.helloService.getHello()
    }

    @Get('user/:name')
    getHelloWithParams(@Param('name') name: string): string{
        return this.helloService.getHelloWithIn(name)
    }

    @Get('query')
    getHelloWithQuery(@Query('name') name: string): string{
        console.log("name: ",name);
        return this.helloService.getHelloWithIn(name || "someone")
    }
}
