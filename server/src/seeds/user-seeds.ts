import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [

      { 
       username: 'jonred6190',
       password: 'password1',
       firstName: 'Jonatahan',
       lastName: 'Redford',
       pickupID: 1
      },
      {
        username: 'maryTnight',
        password: 'password2',
        firstName: 'Mary',
       lastName: 'Knight',
       pickupID: 1
      },
      {
        username: 'riverstephenson',
        password: 'password3',
        firstName: 'River',
       lastName: 'Stephenson',
       pickupID: 1
      },
      {
        username: 'glennPowwow',
        password: 'password4',
        firstName: 'Glenn',
       lastName: 'Powell',
       pickupID: 1
      },
      {
        username: 'bigBabyG',
        password: 'password5',
        firstName: 'Glen',
       lastName: 'Davis',
       pickupID: 1
      },
      {
        username: 'isaklarsson',
        password: 'password6',
        firstName: 'Isak',
       lastName: 'Larsson',
       pickupID: 1
      },
      {
        username: 'sameeridris',
        password: 'password7',
        firstName: 'Sameer',
       lastName: 'Idris',
       pickupID: 1
      },
      {
        username: 'joshuawoods',
        password: 'password8',
        firstName: 'Joshua',
       lastName: 'Woods',
       pickupID: 1
      },
    ],
    { individualHooks: true }
  )
};
