import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnReviewObject } from './return-review.object';
import { ReviewDto } from './review.dto';

@Injectable()
export class ReviewService {

    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.review.findMany( {select: returnReviewObject, orderBy: {createdAt: 'desc'}} )
    }


    async create(userId: number, dto: ReviewDto, productId: number) {
        const product = await this.prisma.product.findUnique({where:{id: productId}})
        if (!product) throw new NotFoundException("Product does not exist")

        return this.prisma.review.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId
                    }
                },
                product: {
                    connect: {
                        id: productId
                    }
                }
            }
        })
    }



    async getAverageValueByProductId(productId: number) {
        return this.prisma.review.aggregate({
            where: { productId },
            _avg: {
                rating: true
            }
        }).then(data => data._avg)
    }
}
