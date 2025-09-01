const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
// const dbName = "dataBase_aiq"; // for local improve
const dbName = "sonyadb"; // for server improve
let db = null;
const client = new MongoClient(uri);

async function getDataBase() {
  try {
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.log("getDataBase function error is: " + error);
    throw new Error(error);
  }
}
module.exports = { getDataBase, client };
