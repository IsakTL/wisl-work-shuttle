import { seedUsers } from './user-seeds.js';
import { seedPickups } from './pickup-seeds.js';
import { seedWarehouses } from './warehouse-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedPickups();
    console.log('\n----- PICKUPS SEEDED -----\n');

    await seedWarehouses();
    console.log('\n----- WAREHOUSES SEEDED -----\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
