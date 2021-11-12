import {Body, Controller, Post, Req, Res, Response} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('/registration')
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @Post('/login')
    login(@Body() userDto: CreateUserDto, @Response() res) {
        const user = this.userService.login(userDto, res)
        return user
    }

}
