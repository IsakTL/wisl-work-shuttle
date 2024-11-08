import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { id: 1, username: 'JoshuaWoods', email: 'joshuawoods@guru.com', password: 'password' },
      {
        id: 1, 
        username: 'SameerIdris',
        email: 'sameeridris@scribe.com',
        password: 'password',
      },
      {
        id: 1, 
        username: 'RiverStephenson',
        email: 'riverstephenson@comet.com',
        password: 'password',
      },
      {
        id: 1,
        username:'IsakLarsson',
        email: 'isaklarsson@pluto.com', password: 'password',
      },
    ],
    { individualHooks: true }
  );
};
