const { getDataBase, client } = require("./connectDB");

async function UpdateDailyTry() {
  try {
    const db = await getDataBase();
    const UserInfoCollection = db.collection("users-info");
    await UserInfoCollection.updateMany({}, { $set: { dailyTry: 5 } });
  } catch (err) {
    console.error("❌ problem in Updating Daily try", err);
  } finally {
    await client.close();
  }
}
module.exports = UpdateDailyTry;
