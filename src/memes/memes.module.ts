import { Meme } from './meme.entity';
import { MemeController } from './controllers/memes.controller';
import { MemeService } from './services/memes.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meme])],
  controllers: [MemeController],
  providers: [MemeService],
})
export class MemesModule {}
