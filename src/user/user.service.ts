import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './return-user.object';
import { Prisma } from '@prisma/client';
import { UserDto } from './user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}


    async updateProfile(id: number, dto: UserDto) {
        const isSameUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(isSameUser && id !== isSameUser.id) throw new BadRequestException("Email not avaliable")

        const user = await this.byId(id);

        return await this.prisma.user.update({
            where: {id},
            data: {
                email: dto.email,
                phone: dto.phone,
                name: dto.name,
                avatarPath: dto.avatarPath,
                password: dto.password ? await hash(dto.password) : user.password,
            }
        })
    }

    async byId(id: number, selectObject: Prisma.UserSelect = {}) {
        const user = await this.prisma.user.findUnique({
            where: {id},
            select: {
                ...returnUserObject,
                favorites: {
                    select: {
                        id: true,
                        slug: true,
                        images: true,
                        name: true,
                        price: true
                    }
                },
                ...selectObject
            }
        })


        if(!user) throw new Error('User not found')

        return user
    }


    async toggleFavorites(id: number, productId: number) {
        const user = await this.byId(id);

        if(!user) throw new Error('User not found')

        const isExist = user.favorites.some(product => product.id === productId);

        await this.prisma.user.update({
            where: {
                id
            },
            data: {
                favorites:{
                    [isExist ? 'disconnect' : 'connect']: {
                        id: productId
                    }
                }
            }
        })

        return {message: 'success'}
    }

}

