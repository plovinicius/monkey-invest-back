import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateStockUserDto, UpdateStockUserDto } from './dto';
import { StocksService } from './stocks.service';

@UseGuards(JwtAuthGuard)
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}
  @Get()
  findAll(@Request() req) {
    return this.stocksService.findAll(req.user.username);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.stocksService.findOne(id, req.user.username);
  }

  @Post()
  async create(@Body() stockDto: CreateStockUserDto, @Request() req) {
    return this.stocksService.create(stockDto, req.user.username);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Request() req
    ) {
    return this.stocksService.delete(id, req.user.username);
  }

  @Put()
  async update(@Body() stockDto: UpdateStockUserDto) {
    return this.stocksService.update(stockDto);
  }
}
