import { Prisma } from "@prisma/client";

export const returnReviewObject:Prisma.ReviewSelect = {
    createdAt: true,
    id: true,
    rating: true,
    text: true,
    user: {
        select: {
            name: true,
            avatarPath: true,
            id: true
        }
    }
}