import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
<<<<<<< HEAD
  firstName: string;
  lastName: string;
  employeeID: string
=======
  username: string;
>>>>>>> 1de6fe02e2567d039e1ea30f5bd612aa5fb04e57
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
<<<<<<< HEAD
  public id!: number
  public firstName!: string
  public lastName!: string;
  public employeeID!: string;
=======
  public id!: number;
  public username!: string;
>>>>>>> 1de6fe02e2567d039e1ea30f5bd612aa5fb04e57
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  console.log('hello')
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
<<<<<<< HEAD
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employeeID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
=======
>>>>>>> 1de6fe02e2567d039e1ea30f5bd612aa5fb04e57
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
<<<<<<< HEAD
      tableName: 'employees',
=======
      modelName: 'User',
      tableName: 'users',
>>>>>>> 1de6fe02e2567d039e1ea30f5bd612aa5fb04e57
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      },
    }
  );

  return User;
}
