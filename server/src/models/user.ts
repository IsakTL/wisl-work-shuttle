import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  pickupID: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public pickupID!: number;

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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pickupID: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      modelName: 'User',
      tableName: 'users',
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
