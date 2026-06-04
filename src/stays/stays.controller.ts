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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('숙소')
@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @ApiOperation({ summary: '숙소 목록 조회' })
  @ApiResponse({ status: 200, description: '숙소 목록 반환' })
  @Get()
  findAll() {
    return this.staysService.findAll();
  }

  @ApiOperation({ summary: '숙소 단건 조회' })
  @ApiResponse({ status: 200, description: '숙소 반환' })
  @ApiResponse({ status: 404, description: '숙소 없음' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staysService.findOne(id);
  }

  @ApiOperation({ summary: '숙소 등록' })
  @ApiResponse({ status: 201, description: '숙소 생성 완료' })
  @Post()
  create(@Body() body: CreateStayDto) {
    return this.staysService.create(body);
  }

  @ApiOperation({ summary: '숙소 수정' })
  @ApiResponse({ status: 200, description: '숙소 수정 완료' })
  @ApiResponse({ status: 404, description: '숙소 없음' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Stay>) {
    return this.staysService.update(id, body);
  }

  @ApiOperation({ summary: '숙소 삭제' })
  @ApiResponse({ status: 200, description: '숙소 삭제 완료' })
  @ApiResponse({ status: 404, description: '숙소 없음' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staysService.remove(id);
  }
}
