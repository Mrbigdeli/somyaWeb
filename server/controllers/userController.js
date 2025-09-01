const { getDataBase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const createJWT = require("../helpers/createJWT");
const generateRandomUserName = require("../helpers/generate_newUserName");
const make_Moadele = require("../functions/moadele_Maker");
const make_choices = require("../functions/choice_maker");
const makePassword = require("../helpers/make_Passwords");
const userController = {
  EIQMake: async (req, res) => {
    try {
      let pass;
      const db = await getDataBase();
      //1) generate random userName
      //2) check if generated userName does not exist before, in db
      let new_userName = await generateRandomUserName();
      //3) save Generated userName and send to client,
      //  new userName attr: left lives, last score,high score, phone number, degreeinmath
      const new_user_info = {
        ieq: new_userName,
        left_lives: 5,
        last_score: 0,
        high_score: 0,
        phone: 912,
        sath: 1,
        sath_counter: 0,
        createdAt: new Date(),
        LogIn_count: 1,
        Randomized_Name: true,
        dailyTry: 5,
      };
      pass = await makePassword();
      await db.collection("passwords").insertOne({
        ieq: new_userName,
        pass: pass,
        isPassCatched: false,
      });
      await db.collection("users-eiq").insertOne({
        ieq: new_userName,
        createdAt: new Date(),
        LogIn_count: 1,
        Randomized_Name: true,
      });
      await db.collection("users-info").insertOne(new_user_info);
      return returnStatus(res, 200, false, "done successfully", {
        UserIEQ: new_userName,
      });
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong");
    }
    // finally {
    //   await client.close();
    // }
  },
  CheckAnswer: async (req, res) => {
    try {
      const db = await getDataBase();
      let choosed_qus = await db.collection("questions").findOne({
        qus: req.body.qus,
      });
      if (!choosed_qus) {
        return returnStatus(res, 404, true, "QUS Not found");
      }
      let Req_Answer_Int = parseInt(req.body.ans);
      if (choosed_qus.ans == Req_Answer_Int) {
        let choosed_user = await db.collection("users-info").findOne({
          ieq: req.body.IEQ,
        });
        let pre_Sath = parseInt(choosed_user.sath);
        let pre_sath_counter = parseInt(choosed_user.sath_counter);
        let pre_last_score = parseInt(choosed_user.last_score);
        let new_Sath = 0;
        if (pre_sath_counter + 1 == 10) {
          new_Sath = pre_Sath + 1;
        } else {
          new_Sath = pre_Sath;
        }
        const user = await db.collection("users-info").findOneAndUpdate(
          {
            ieq: req.body.IEQ,
          },
          {
            $set: {
              sath: new_Sath,
              sath_counter: pre_sath_counter + 1,
              last_score: pre_last_score + 1,
            },
          }
        );
        return returnStatus(res, 200, false, "answer is right", {
          AnswerCheck: true,
        });
      } else {
        let choosed_user = await db.collection("users-info").findOne({
          ieq: req.body.IEQ,
        });
        let pre_left_lives = parseInt(choosed_user.left_lives);
        const user = await db.collection("users-info").findOneAndUpdate(
          {
            ieq: req.body.IEQ,
          },
          {
            $set: {
              left_lives: pre_left_lives - 1,
            },
          }
        );
        return returnStatus(res, 200, false, "answer is wrong", {
          AnswerCheck: false,
          left_lives: pre_left_lives - 1,
        });
      }
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong!?");
    }
  },
  updateInfo: async (req, res) => {
    try {
      const db = await getDataBase();
      let choosed_User = await db.collection("users-info").findOne({
        ieq: req.body.IEQ,
      });
      if (!choosed_User) {
        return returnStatus(res, 404, true, "user Info Not found");
      }
      let last_score = choosed_User.last_score;
      let left_lives = choosed_User.left_lives;
      return returnStatus(res, 200, false, "user founded right", {
        score: last_score,
        lives: left_lives,
      });
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong!?");
    }
  },
  LeftLivesMinus: async (req, res) => {
    try {
      const db = await getDataBase();
      let choosed_User = await db.collection("users-info").findOne({
        ieq: req.body.IEQ,
      });
      if (!choosed_User) {
        return returnStatus(res, 404, true, "user Info Not found");
      }
      let left_lives = choosed_User.left_lives;
      let howMuch = parseInt(req.body.howMuch);
      const user = await db.collection("users-info").findOneAndUpdate(
        {
          ieq: req.body.IEQ,
        },
        {
          $set: {
            left_lives: left_lives - howMuch,
          },
        }
      );
      return returnStatus(res, 200, false, "everyThing is right");
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong!0?");
    }
  },
  passCatch: async (req, res) => {
    try {
      const db = await getDataBase();
      let choosed_User = await db.collection("passwords").findOne({
        ieq: req.body.IEQ,
      });
      if (!choosed_User) {
        return returnStatus(res, 404, true, "user Info Not found");
      }
      if (choosed_User.isPassCatched) {
        return returnStatus(res, 400, true, "user catched pass before");
      }
      let UserPassword = choosed_User.pass;
      await db.collection("passwords").findOneAndUpdate(
        {
          ieq: req.body.IEQ,
        },
        {
          $set: {
            isPassCatched: true,
          },
        }
      );
      return returnStatus(
        res,
        200,
        false,
        "everyThing is right in catching password",
        {
          pass: UserPassword,
        }
      );
    } catch (err) {
      console.log(err);
      return returnStatus(
        res,
        500,
        true,
        "Something went wrong in catching password"
      );
    }
    // finally {
    //   await client.close();
    // }
  },
  UserTry: async (req, res) => {
    try {
      const db = await getDataBase();
      let choosed_User = await db.collection("users-info").findOne({
        ieq: req.body.IEQ,
      });
      if (!choosed_User) {
        return returnStatus(res, 404, true, "user Info Not found");
      }
      let dailyTry = choosed_User.dailyTry;
      let dailyTry_Int = parseInt(dailyTry);
      if (dailyTry_Int > 0) {
        return returnStatus(res, 200, false, "user hass daily try", {
          userHasTry: true,
        });
      } else {
        return returnStatus(res, 200, false, "user does not have daily try", {
          userHasTry: false,
        });
      }
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong!?");
    }
  },
  SaveHighScore: async (req, res) => {
    try {
      const db = await getDataBase();
      let choosed_User = await db.collection("users-info").findOne({
        ieq: req.body.IEQ,
      });
      if (!choosed_User) {
        return returnStatus(res, 404, true, "user Info Not found");
      }
      let last_highScore_score = choosed_User.high_score;
      let last_highScore_score_int = parseInt(last_highScore_score);
      let new_score_Requested = parseInt(req.body.sc);
      if (new_score_Requested > last_highScore_score_int) {
        await db.collection("users-info").findOneAndUpdate(
          {
            ieq: req.body.IEQ,
          },
          {
            $set: {
              high_score: new_score_Requested,
              last_score: 0,
              sath_counter: 0,
            },
          }
        );
      } else {
        await db.collection("users-info").findOneAndUpdate(
          {
            ieq: req.body.IEQ,
          },
          {
            $set: {
              last_score: 0,
              sath_counter: 0,
            },
          }
        );
      }
      return returnStatus(res, 200, false, "high score checked is right");
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong!?");
    }
  },
  MinusOne_UserTry: async (req, res) => {
    try {
      const db = await getDataBase();
      let choosed_User = await db.collection("users-info").findOne({
        ieq: req.body.IEQ,
      });
      if (!choosed_User) {
        return returnStatus(res, 404, true, "user Info Not found");
      }
      let dailyTry = choosed_User.dailyTry;
      let dailyTry_Int = parseInt(dailyTry);
      let howMuch = parseInt(req.body.howMuch);
      await db.collection("users-info").findOneAndUpdate(
        {
          ieq: req.body.IEQ,
        },
        {
          $set: {
            dailyTry: dailyTry_Int - howMuch,
            left_lives: 5,
          },
        }
      );
      return returnStatus(res, 200, false, "everyThing is right");
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong!0?");
    }
  },
};

module.exports = userController;
