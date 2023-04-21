import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
 * Retrieve all orders for the given user ID.
 * @param id - The ID of the current user.
 * @returns A Promise that resolves to an array of orders.
 */
  @Get()
  @Auth()
  async getAll(@CurrentUser('id') id: number) {
    return this.orderService.getAll(+id)
  }
}
