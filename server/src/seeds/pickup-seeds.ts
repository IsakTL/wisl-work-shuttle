import { Pickup } from "../models/index.js";

export const seedPickups = async () => {
  await Pickup.bulkCreate([
    {
      lon: 44.94,
      lat: -93.08844,
      warehouseID: 1,
    },
  ]);
};
