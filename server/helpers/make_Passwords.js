const { getDataBase, client } = require("./connectDB");
const returnStatus = require("./returnStatus");
async function makePassword() {
  try {
    const db = await getDataBase();
    let generated_password;
    let loop_OP = true;
    while (loop_OP == true) {
      generated_password = Math.floor(Math.random() * 9000000) + 1000000;
      let isPass_Exist = await db.collection("passwords").findOne({
        pass: generated_password,
      });
      if (!isPass_Exist) {
        loop_OP = false;
      }
    }
    return generated_password;
  } catch (err) {
    console.log(err);
    return returnStatus(
      res,
      500,
      true,
      "Something went wrong in generate password"
    );
  }
  // finally {
  //   await client.close();
  // }
}
module.exports = makePassword;
