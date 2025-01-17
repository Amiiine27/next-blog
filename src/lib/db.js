import "server-only";Nova_Squa
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName) {
  try {
    await client.connect();
    console.log(">>>>>>Connected to DB<<<<<<<");
    return client.db(dbName);
  } catch (e) {
    console.log(e);
  }
}

export async function getCollection(collectionName) {
  //colonne
  const db = await getDB("next_blog_db");
  if (db) return db.collection(collectionName);
  return null;
}
