import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
    constructor(private readonly userService: UserService, private readonly prisma: PrismaService) {}


    async getMain(userId: number) {
        const user = await this.userService.byId(userId, {
            orders: {
                select: {
                    items: true
                }
            },
            reviews: true
        })


        return [
            {
                name: "Orders",
                value: user.orders.length
            },
            {
                name: "Reviews",
                value: user.reviews.length
            },
            {
                name: "Favorites",
                value: user.favorites.length
            },
            {
                name: "Total money spent",
                value: 404
            }
        ]
    }

}
