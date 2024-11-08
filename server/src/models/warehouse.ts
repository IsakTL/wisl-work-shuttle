import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface WarehouseAttributes {
  id: number;
  lon: number;
  lat: number;
}

interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, "id"> {}

export class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: number;
  public lon!: number;
  public lat!: number;
}

export function WarehouseFactory(sequelize: Sequelize): typeof Warehouse {
  Warehouse.init(
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
    },
    {
        modelName: 'Warehouse',
        tableName: 'warehouse',
        sequelize,
    }
  );
  return Warehouse;
}
