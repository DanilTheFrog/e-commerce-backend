import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {

    constructor(private readonly prisma: PrismaService) {}

    async getAll(userId: number) {
        return await this.prisma.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

}
