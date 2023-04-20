import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PaginationModule } from './pagination/pagination.module';


@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, ProductModule, ReviewModule, CategoryModule, OrderModule, StatisticsModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
