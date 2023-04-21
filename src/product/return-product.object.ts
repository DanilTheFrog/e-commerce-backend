import { Prisma } from "@prisma/client";
import { returnCategoryObject } from "src/category/return-category.object";
import { returnReviewObject } from "src/review/return-review.object";

export const returnProductObject: Prisma.ProductSelect = {
    name: true,
    images: true,
    slug: true,
    price: true,
    createdAt: true,
    description: true,
    id: true
}

export const returnProductObjectFull: Prisma.ProductSelect = {
    ...returnProductObject,
    reviews: {
        select: returnReviewObject
    },
    category: {
        select: returnCategoryObject
    }
}