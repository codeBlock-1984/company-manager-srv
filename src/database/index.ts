import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '/database.json');

//function to write to the data base
export const writeToDB = (data: unknown) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data)); //it replaces it with the new data when we write to the file database.JSON
};

//read from a data base function
export const readDB = () => {
  return fs.readFileSync(DB_PATH, { encoding: "utf8", flag: "r" });
};
