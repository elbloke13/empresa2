import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let db: Db;

const dbName = "Empresa";

export const connectToMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("Falta la variable MONGO_URL");
    }

    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);

    console.log("Estás conectado al mongo");
  } catch (err) {
    console.log("Error del mondongo:", err);
  }
};

export const getDB = (): Db => db;

export const closeMongoDB = async () => {
  try {
    if (client) {
      await client.close();
    }
  } catch (err) {
    console.log("Error cerrando el mondongo:", err);
  }
};