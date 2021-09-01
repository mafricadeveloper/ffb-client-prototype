import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('FFB_SERVICE') private client: ClientProxy,
  ) {}

  @Get(':year/:month')
  async default(
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<Observable<any>> {
    const pattern = { cmd: 'QUERY' };
    const payload = { year: year, month: month };
    return await lastValueFrom(this.client.send<any, any>(pattern, payload));
  }
}
