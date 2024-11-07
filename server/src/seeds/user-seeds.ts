import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'jonred6190', password: 'password1' },
      {
        username: 'maryTnight',
        password: 'password2',
      },
      {
        username: 'riverstephenson',
        password: 'password3',
      },
      {
        username: 'glennPowwow',
        password: 'password4',
      },
      {
        username: 'bigBabyG',
        password: 'password5',
      },
    ],
    { individualHooks: true }
  );
};
