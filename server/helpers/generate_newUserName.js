const { getDataBase, client } = require("../helpers/connectDB");
async function generateRandomUserName() {
  try {
    const db = await getDataBase();
    let generated_One = "";
    let loop_OP_Func = true;
    while (loop_OP_Func) {
      let randomize_Num = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      generated_One = `user-${randomize_Num}`;
      let is_userName_UsedBefore = await db.collection("users-eiq").findOne({
        ieq: generated_One,
      });
      if (!is_userName_UsedBefore) {
        loop_OP_Func = false;
        return generated_One;
      }
    }
  } catch (err) {
    console.log("error in generate EIQ :" + err);
    return returnStatus(res, 500, true, "Something went wrong in generate EIQ");
  }
}
module.exports = generateRandomUserName;
