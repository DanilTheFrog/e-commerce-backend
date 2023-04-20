import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import {faker} from '@faker-js/faker'
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RefreshDto } from './dto/refresh-token.dto';


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private jwt: JwtService) {}
    
    async login(dto: AuthDto) {
        const user = await this.validateUser(dto);

        const tokens = await this.issueToken(user.id);
        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }


    async getNewTokens(dto: RefreshDto) {
        const result = await this.jwt.verifyAsync(dto.refreshToken)
        if (!result) throw new UnauthorizedException('invalid refresh token');

        const user = await this.prisma.user.findUnique({where: {id: result.id}})

        const tokens = await this.issueToken(user.id);
        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async register(dto: AuthDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        if (existingUser) throw new BadRequestException("User already exists");

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: faker.name.firstName(),
                avatarPath: faker.image.avatar(),
                phone: faker.phone.number('+7 (###) ### ##-##'),
                password: await hash(dto.password)
            }
        })

        const tokens = await this.issueToken(user.id);


        return {
            user: this.returnUserFields(user),
            ...tokens
        };
    }

    private async issueToken(userId: number) {
        const data = {id: userId};

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return {accessToken, refreshToken}
    }

    private returnUserFields(user: User) {
        return {
            id: user.id,
            email: user.email
        }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({where: {email: dto.email}})

        if (!user) throw new NotFoundException("User does not exist");

        const isValid = await verify(user.password, dto.password);

        if(!isValid) throw new UnauthorizedException("Invalid email or password");

        return user;
    }
}
