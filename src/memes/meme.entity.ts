import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity({ name: 'memes' })
export class Meme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @Column({ length: 200 })
  url: string;

  @Column({ type: 'int', default: () => 0 })
  numberOfLikes: number;

  @Column({ type: 'int', default: () => 0 })
  numberOfComments: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updatedAt: Date;
}
