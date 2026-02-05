import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    getHello(): string{
        return 'Hello from hello service'
    }
    getHelloWithIn(name: string): string{
        return `Hello ${name} from our service`
    }
}
