// index.ts
import { createConnection } from 'typeorm';
import { seedUser, usersToSeed } from './user-seed';

const seedDatabase = async () => {
  const connection = await createConnection();

  try {
    const seededUsers = await Promise.all(
      usersToSeed.map(async (userData) => {
        const user = await seedUser(userData.name, userData.email, userData.password);
        return connection.manager.save(user);
      })
    );
    console.log('Users seeded:', seededUsers);

    console.log('Seeders ejecutados correctamente');
  } catch (error) {
    console.error('Error al ejecutar seeders:', error);
  } finally {
    await connection.close();
  }
};

seedDatabase();
