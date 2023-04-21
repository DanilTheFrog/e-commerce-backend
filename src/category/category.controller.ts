import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './update.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }
  

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlag(slug)
  }


  @HttpCode(200)
  @Post()
  @Auth()
  async create() {
    return this.categoryService.create()
  }


  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth()
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: number) {
    return this.categoryService.delete(+id)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: number) {
    return this.categoryService.byId(+id)
  }
}
