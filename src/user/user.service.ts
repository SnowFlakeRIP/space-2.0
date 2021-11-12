import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User, private jwtService: JwtService) {
    }

    async createUser(dto: CreateUserDto) {
        try {
            const candidate = await User.findOne({where: {email: dto.email}})
            if (!candidate) {
                const hashPassword = await bcrypt.hash(dto.password, 5)
                const user = await User.create({...dto, password: hashPassword})
                return user
            } else {
                return {message: 'Пользователь с таким email уже существует'}
            }
        } catch (e) {
            return e
        }
    }

    async login(dto: CreateUserDto,res) {
        try {
            const user = await this.validateUser(dto)
            const token = this.generateToken(user)
            return token

        } catch (e) {
            throw new UnauthorizedException({message: 'Ошибка авторизации, проверьте введенные данные'})
        }
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, email: user.email}
        return {
            token: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload,{
                expiresIn: '1m'})
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await User.findOne({where: {email: dto.email}})
        const password = await bcrypt.compare(dto.password, user.password)
        if (user && password) {
            return user
        }
        throw new UnauthorizedException({message: 'Некоректный логин или пароль'})
    }

}
