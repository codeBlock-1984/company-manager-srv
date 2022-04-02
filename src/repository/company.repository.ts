import { readDB, writeToDB } from '../database/index';

export const getCompanies = () => {
  //getting what's in a database
  let db;
  try {
    db = readDB(); // with the get function, try to read from the db
  } catch (error) {
    writeToDB([]); // if db read fails.  // create empty db
    db = readDB(); // read db again
  }
  return JSON.parse(db); // return db data parsed as JSON //when there's already something in the database from creating a post
};

export const generateCompanyId = () => {
    const db = getCompanies();
    return db.length + 1;
}


export const createCompany = (data: unknown) => {
  const db = getCompanies();
  db.push(data);
  writeToDB(db); //writing to database
};

//function for update
export const editCompany = (id: number, data: { [key: string]: any }) => {
  let db = getCompanies();
  let updatedRecord;
  db = db.map((record: { [key: string]: any }) => {
    if (record.id === id) {
      // prevent updating id
      delete data.id;

      updatedRecord = {
        ...record,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return updatedRecord;
    }

    return record;
  });
  writeToDB(db);
  return updatedRecord;
};

export const removeCompany = (id: number) => {
  let db = getCompanies();
  const len = db.length;
  db = db.filter((record: { [key: string]: any }) => record.id !== id);
  const len2 = db.length;
  writeToDB(db);
  return len !== len2;
};
