import { faker } from "@faker-js/faker";
import { PrismaClient, Product } from "@prisma/client";
import * as env from 'dotenv';
env.config()

const prisma = new PrismaClient();

const createProducts = async (quantity: number) => {
    const products: Product[] = [];

    for (let i=0; i<quantity; i++) {
        const productName = faker.commerce.productName()
        const categoryName = faker.commerce.department()

        const product = await prisma.product.create({
            data: {
                name: productName,
                description: faker.commerce.productDescription(),
                slug: faker.helpers.slugify(productName).toLowerCase(),
                price: +faker.commerce.price(10, 999, 0),
                images: Array.from({length: faker.datatype.number({min:2, max: 6})}).map(()=>(faker.image.imageUrl(500, 500))),
                category: {
                    create: {
                        name: categoryName,
                        slug: faker.helpers.slugify(categoryName).toLowerCase()
                    }
                },
                reviews: {
                    create: [
                        {
                            rating: +faker.datatype.number({min:1, max:5}),
                            text: faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 4
                                }
                            }
                        },
                        {
                            rating: +faker.datatype.number({min:1, max:5}),
                            text: faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 4
                                }
                            }
                        },
                    ]
                }
            }
        })
        products.push(product);
    }

    console.log(`Created ${products.length} products`);
}

export default async function main() {
    console.log('Statr generating products...');

    await createProducts(10)
        .then(()=>console.log('products were created'))
}

main()
    .catch(e=>console.error(e))
    .finally(async()=>{
        await prisma.$disconnect()
    })