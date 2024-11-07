import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'JoshuaWoods', email: 'joshuawoods@guru.com', password: 'password' },
      {
        username: 'SameerIdris',
        email: 'sameeridris@scribe.com',
        password: 'password',
      },
      {
        username: 'RiverStephenson',
        email: 'riverstephenson@comet.com',
        password: 'password',
      },
      {
        username:'IsakLarsson',
        email: 'isaklarsson@pluto.com', password: 'password',
      },
    ],
    { individualHooks: true }
  );
};
