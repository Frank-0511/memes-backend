import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateMemeDto {
  @ApiProperty({
    example: 'Meme',
    description: 'The name of the meme',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  readonly name: string;

  @ApiProperty({
    example: 'This is a meme',
    description: 'The description of the meme',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty()
  readonly description: string;

  @ApiProperty({
    example: 'https://i.imgur.com/1fDw3qR.jpg',
    description: 'The url of the meme',
  })
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  @ApiProperty()
  readonly url: string;

  @ApiProperty({
    example: '1',
    description: 'The number of likes of the meme',
  })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly numberOfLikes: number;

  @ApiProperty({
    example: '1',
    description: 'The number of comments of the meme',
  })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly numberOfComments: number;
}

export class UpdateMemeDto extends PartialType(CreateMemeDto) {}
