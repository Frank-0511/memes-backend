import { Meme } from '../memes/meme.entity';

interface MemeData {
  name: string;
  description: string;
  url: string;
  numberOfLikes: number;
}

export const seedMeme = async ({
  name,
  description,
  url,
  numberOfLikes,
}: MemeData) => {
  const meme = new Meme();
  meme.name = name;
  meme.description = description;
  meme.url = url;
  meme.numberOfLikes = numberOfLikes;
  return meme;
};

export const memesToSeed = [
  {
    name: 'Meme 1',
    description: 'Description 1',
    url: 'https://www.isdi.education/uploads/media/open-graph/07/557-meme_marketing_0.png?v=1-0',
    numberOfLikes: 6,
    numberOfComments: 2,
  },
  {
    name: 'Meme 2',
    description: 'Description 2',
    url: 'https://s1.elespanol.com/2016/12/16/social/memes-humor-redes_sociales_178744040_23538138_1706x960.jpg',
    numberOfLikes: 7,
    numberOfComments: 3,
  },
  {
    name: 'Meme 3',
    description: 'Description 3',
    url: 'https://ethic.es/wp-content/uploads/2023/01/memes-antes.jpg',
    numberOfLikes: 8,
    numberOfComments: 4,
  },
];
