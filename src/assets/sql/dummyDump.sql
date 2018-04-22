-- Create item table to store all items
CREATE TABLE IF NOT EXISTS item(
    itemId INTEGER PRIMARY KEY AUTOINCREMENT,
    itemName TEXT NOT NULL,
    selectFlag INTEGER,
    CONSTRAINT name_unique UNIQUE (itemName)
    );

-- Initial data for item table
INSERT INTO item (itemName,selectFlag) VALUES('Apple',0);
INSERT INTO item (itemName,selectFlag) VALUES('Orange',0);
INSERT INTO item (itemName,selectFlag) VALUES('Pen',0);

-- Create mart table to store all marts
CREATE TABLE IF NOT EXISTS mart(
    martId INTEGER PRIMARY KEY AUTOINCREMENT,
    martName TEXT NOT NULL,
    CONSTRAINT name_unique UNIQUE (martName)
    );

-- Initial data for mart table
INSERT INTO mart (martName) VALUES('Target');
INSERT INTO mart (martName) VALUES('Walmart');
INSERT INTO mart (martName) VALUES('Costco');
INSERT INTO mart (martName) VALUES('Home Depot');
INSERT INTO mart (martName) VALUES('Kohls');
INSERT INTO mart (martName) VALUES('JC Panny');
INSERT INTO mart (martName) VALUES('Sams club');

-- Create itemMart table. This is a relatinal table for item and mart
CREATE TABLE IF NOT EXISTS itemMart(
    martId INTEGER NOT NULL,
    itemId INTEGER NOT NULL,
    FOREIGN KEY(martId) REFERENCES mart(martId),
    FOREIGN KEY(itemId) REFERENCES item(itemId)
    );
