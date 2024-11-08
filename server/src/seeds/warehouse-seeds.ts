import { Warehouse } from "../models/index.js";

export const seedWarehouses = async () => {
  await Warehouse.bulkCreate([
    {
      lon: 44.98439,
      lat: -93.26785,
    },
  ]);
};