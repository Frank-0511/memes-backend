import { memesToSeed, seedMeme } from './meme-seed';
import { seedUser, usersToSeed } from './user-seed';

// index.ts
import { createConnection } from 'typeorm';

const seedDatabase = async () => {
  const connection = await createConnection();

  try {
    const seededUsers = await Promise.all(
      usersToSeed.map(async (userData) => {
        const user = await seedUser(
          userData.name,
          userData.email,
          userData.password,
        );
        return connection.manager.save(user);
      }),
    );
    console.log('Users seeded:', seededUsers);

    const seededMemes = await Promise.all(
      memesToSeed.map(async (memeData) => {
        const meme = await seedMeme(memeData);
        return connection.manager.save(meme);
      }),
    );
    console.log('Memes seeded:', seededMemes);

    console.log('Seeders ejecutados correctamente');
  } catch (error) {
    console.error('Error al ejecutar seeders:', error);
  } finally {
    await connection.close();
  }
};

seedDatabase();
