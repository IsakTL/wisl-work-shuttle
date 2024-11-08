-- DROP DATABASE
DROP DATABASE IF EXISTS warehouse_db;

-- CREATE DATABASE
CREATE DATABASE warehouse_db;

CREATE TABLE workers (
    workerID SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    pickupID INT,
    FOREIGN KEY pickupID REFERENCES (pickups.id)
);

CREATE TABLE pickups (
    id SERIAL PRIMARY KEY,
    lon NUMBER,
    lat NUMBER,
    warehouseID INT,
    FOREIGN KEY warehouseID references (warehouses.id)
);

CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    lon NUMBER,
    lat NUMBER
    -- is city name necessary here?
)

-- INSERT INTO warehouses (lon, lat)
-- VALUES (44.98439, -93.26785);
-- Corner of First Ave and First St in Minneapolis

-- INSERT INTO pickups (lon, lat, warehouseID)
-- VALUES (44.94000, -93.08844, 1);
-- Corner of Wabasha and Harriet Island Blvd in St. Paul


