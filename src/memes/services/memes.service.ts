import { Injectable } from '@nestjs/common';
import { Meme } from '../meme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/page/dtos/page-options.dto';
import { PageMetaDto } from 'src/page/dtos/page-meta.dto';
import { PageDto } from 'src/page/dtos/page.dto';

@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme) private memeRepository: Repository<Meme>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Meme>> {
    try {
      const queryBuilder = this.memeRepository.createQueryBuilder('meme');
      queryBuilder
        .orderBy('meme.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.pageSize);
      const count = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ count, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      console.error('Error en findAll:', error);
      throw new Error('Ocurrió un error al procesar la solicitud.');
    }
  }
}
