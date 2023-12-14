import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { Meme } from '../meme.entity';
import { MemeService } from '../services/memes.service';
import { PageOptionsDto } from 'src/page/dtos/page-options.dto';
import { PageDto } from 'src/page/dtos/page.dto';
import { ValidationError } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { CreateMemeDto } from '../meme.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('meme')
export class MemeController {
  constructor(private readonly memesService: MemeService) {}

  @Get()
  @ApiOperation({
    summary: 'List of memes',
    description: 'List of memes',
    tags: ['Memes'],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of memes',
    type: PageDto,
  })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Meme>> {
    try {
      return this.memesService.findAll(pageOptionsDto);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(
          'Error de validación en los parámetros de consulta',
        );
      }
      console.error('Error en el controlador:', error);
      throw error;
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Create a meme',
    description: 'Create a meme',
    tags: ['Memes'],
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The meme has been created successfully',
    type: Meme,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateMemeDto): Promise<Meme> {
    return this.memesService.createMeme(payload);
  }
}
