import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, userRole } from './schemas/user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepositry: Repository<User>,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async regsiterUser(regsiterUserData: RegisterDto) {
        let user = await this.userRepositry.findOne({
            where: { email: regsiterUserData.email }
        })
        if (user) {
            throw new ConflictException('Email is already exist!')
        }
        const hasePass = await bcrypt.hash(regsiterUserData.password, 12)
        const newUser = this.userRepositry.create({
            name: regsiterUserData.name,
            email: regsiterUserData.email,
            password: hasePass
        })
        user = await this.userRepositry.save(newUser)
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            message: 'User register successfully!'
        }
    }

    async createAdmin(regsiterUserData: RegisterDto) {
        let user = await this.userRepositry.findOne({
            where: { email: regsiterUserData.email }
        })
        if (user) {
            throw new ConflictException('Email is already exist!')
        }
        const hasePass = await bcrypt.hash(regsiterUserData.password, 12)
        const newUser = this.userRepositry.create({
            name: regsiterUserData.name,
            email: regsiterUserData.email,
            role: userRole.Admin,
            password: hasePass
        })
        user = await this.userRepositry.save(newUser)
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            message: 'Admin register successfully!'
        }
    }

    async loginUser(loginUserData: LoginDto) {
        const user = await this.userRepositry.findOne({
            where: { email: loginUserData.email }
        })
        if (!user) {
            throw new NotFoundException('user not found with  this cridencials!')
        }
        const isMatch = await bcrypt.compare(loginUserData.password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException('wrong email or password!')
        }
        const token = this.generateToken(user)
        const { password, ...result } = user
        return {
            user: result,
            token
        }
    }

    async findUserById(usreId: string) {
        const user = await this.userRepositry.findOne({
            where: { id: usreId }
        })
        if (!user) {
            throw new NotFoundException(`User not found with this id ${usreId}`)
        }
        const { password, ...result } = user
        return result
    }

    async refreshToken(token: string) {
        try {
            const secret = this.configService.get<string>('jwt_refresh_secret')!
            const payload = this.jwtService.verify(token, {
                secret: secret
            })
            const user = await this.userRepositry.findOne({
                where: { id: payload.id }
            })
            if (!user) {
                throw new UnauthorizedException('invalid token!')
            }
            const access_token = this.generateAccessToken(user)
            return {
                access_token
            }
        } catch (error) {
            throw new UnauthorizedException('invalid token!')
        }
    }

    private generateToken(user: User) {
        return {
            access_token: this.generateAccessToken(user),
            refresh_token: this.generatrRefreshToken(user)
        }
    }
    private generateAccessToken(user: User) {
        const secret = this.configService.get<string>('jwt_access_secret')!
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }
        return this.jwtService.sign(payload, {
            secret: secret,
            expiresIn: '15m'
        })
    }
    private generatrRefreshToken(user: User) {
        const secret = this.configService.get<string>('jwt_refresh_secret')!
        const payload = {
            sub: user.id
        }
        return this.jwtService.sign(payload, {
            secret: secret,
            expiresIn: '7d'
        })
    }
}
