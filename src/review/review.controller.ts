import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewsService: ReviewService, private readonly prisma: PrismaService) {}

    @Get('')
    async getAll() {
      return this.reviewsService.getAll()
    }


    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('leave/:productId')
    @Auth()
    async leaveReview(
      @Param('productId') productId: number,
      @Body() dto: ReviewDto,
      @CurrentUser('id') userId: number
      ) {
        
        return this.reviewsService.create(+userId, dto, +productId)
    }

}
