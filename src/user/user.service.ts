import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
    constructor(private readonly helloService: HelloService){}
    getAllUser(){
        return [
            {
                id: 1,
                name: 'kishalay'
            },
            {
                id: 2,
                name: 'suman'
            },
            {
                id: 3,
                name: 'akbar'
            },
            {
                id: 4,
                name: 'rahaman'
            },
        ]
    }

    getUserById(id: number){
        const user = this.getAllUser().find((i)=>i.id === id)
        return user
    }

    getMessage(id: number){
        const user = this.getUserById(id)
        if (!user) {
            return 'user not found!'
        }
        return this.helloService.getHelloWithIn(user?.name)
    }
}
