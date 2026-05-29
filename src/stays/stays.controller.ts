import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { StaysService } from './stays.service';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Get()
  findAll() {
    return this.staysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staysService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; location: string; price: number }) {
    return this.staysService.create(body);
  }
}
