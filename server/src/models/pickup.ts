import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface PickupAttributes {
  id: number;
  lon: number;
  lat: number;
  warehouseID: number;
}

interface PickupCreationAttributes extends Optional<PickupAttributes, "id"> {}

export class Pickup
  extends Model<PickupAttributes, PickupCreationAttributes>
  implements PickupAttributes
{
  public id!: number;
  public lon!: number;
  public lat!: number;
  public warehouseID!: number;
}

export function PickupFactory(sequelize: Sequelize): typeof Pickup {
  Pickup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      lon: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      warehouseID: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
        modelName: 'Pickup',
        tableName: 'pickup',
        sequelize,
    }
  );
  return Pickup;
}
