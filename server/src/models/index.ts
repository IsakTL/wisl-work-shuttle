import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { PickupFactory } from './pickup.js';
import { WarehouseFactory } from './warehouse.js';

const User = UserFactory(sequelize);
const Pickup = PickupFactory(sequelize);
const Warehouse = WarehouseFactory(sequelize);

User.hasOne(Pickup, {foreignKey: 'pickup.id'});
User.hasOne(Warehouse, {foreignKey: 'warehouse.id'});
Pickup.belongsTo(User, {foreignKey: 'pickup.id', as: 'workerID'})
Warehouse.belongsTo(User, {foreignKey: 'warehouse.id', as: 'workerID'})

export { User, Pickup, Warehouse };
