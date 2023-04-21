import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}


  @Get()
  @Auth()
  async getMain(@CurrentUser('id') id: number) {
    return this.statisticsService.getMain(+id)
  }
}
