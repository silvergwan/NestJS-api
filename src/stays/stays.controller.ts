import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { CreateStayDto } from './dto/create-stay.dto';
import { StaysService } from './stays.service';
import { Stay } from './schema/stay.schema';

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
  create(@Body() body: CreateStayDto) {
    return this.staysService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Stay>) {
    return this.staysService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staysService.remove(id);
  }
}
