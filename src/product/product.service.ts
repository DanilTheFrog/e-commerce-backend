import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) {}


}
