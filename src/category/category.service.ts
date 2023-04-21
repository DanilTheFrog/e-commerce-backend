import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/slug-generator';
import { returnCategoryObject } from './return-category.object';
import { UpdateCategoryDto } from './update.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async byId(id: number) {
        const category = this.prisma.category.findUnique({
            where: { id },
            select: returnCategoryObject
        })

        if (!category) throw new NotFoundException("Category not found")

        return category
    }

    async bySlag(slug: string) {
        const category = this.prisma.category.findUnique({where: {slug}})

        if (!slug) throw new NotFoundException("Catecory not found")

        return category;
    }

    async getAll() {
        return this.prisma.category.findMany( {select: returnCategoryObject} )
    }

    async create() {
        return this.prisma.category.create({
            data: {
                name: '',
                slug: ''
            }
        })
    }

    async update(id: number, dto: UpdateCategoryDto) {
        return this.prisma.category.update({
            where: { id },
            data: {
                name: dto.name,
                slug: generateSlug(dto.name)
            }
        })
    }

    async delete(id: number) {
        return this.prisma.category.delete({where: {id}})
    }
}
