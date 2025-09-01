const { getDataBase, client } = require("./connectDB");

async function deleteOldData() {
  try {
    const db = await getDataBase();
    const QuestionCollection = db.collection("questions");
    const UserEiqCollection = db.collection("users-eiq");
    const UserInfoCollection = db.collection("users-info");
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    await UserInfoCollection.deleteMany({
      createdAt: { $lt: startOfToday },
      LogIn_count: 1,
      Randomized_Name: true,
      dailyTry: { $ne: 0 },
      //   LogIn_count: { $ne: 1 }, // یعنی مخالف ۱
      //   LogIn_count: { $gte: 1 }, // یعنی ۱ یا بیشتر
    });
    await UserEiqCollection.deleteMany({
      createdAt: { $lt: startOfToday },
      LogIn_count: 1,
      Randomized_Name: true,
      //   LogIn_count: { $ne: 1 },
    });
    await QuestionCollection.deleteMany({
      createdAt: { $lt: startOfToday },
    });
  } catch (err) {
    console.error("❌ خطا در حذف:", err);
  } finally {
    await client.close();
  }
}
module.exports = deleteOldData;
