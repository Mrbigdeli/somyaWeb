const { getDataBase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const checkDeciamlAnswer = require("./checkDecimalAnswer");
const replaceMathSymbols = require("./replaceMathSymbols");
const ZeroDivisionCheck = require("./ZeroDivisionCheck");
async function make_Moadele(Ieq_Input) {
  let Signs = ["+", "-", "*"];
  try {
    const db = await getDataBase();
    let founded_user = await db.collection("users-info").findOne({
      ieq: Ieq_Input,
    });
    let sath_play = founded_user.sath;
    let loop_OP_Func = true;
    let max_possible_Num = 101;
    let max_possible_count = 3;
    let max_possible_Sign_Index = 2; // if last index was 1 , this part should be 2
    if (sath_play == 2) {
      max_possible_Sign_Index = 3;
    } else if (sath_play == 3) {
      // max_possible_Num = 1001;
      max_possible_count = 4;
    } else if (sath_play == 4) {
      // max_possible_Num = 2001;
      max_possible_Num = 501;
    } else if (sath_play == 5) {
      // max_possible_Num = 4001;
      max_possible_count = 5;
    } else if (sath_play == 6) {
      // max_possible_Num = 12001;
    } else {
      max_possible_Num = 101;
    }
    while (loop_OP_Func) {
      let founded_signs = [];
      let founded_numbers = [];
      let generated_moadele = "";
      let how_many_signs, how_many_numbers;
      how_many_numbers = Math.floor(Math.random() * max_possible_count);
      how_many_signs = how_many_numbers - 1;
      if (how_many_numbers >= 2 && how_many_signs >= 1) {
        for (let m = 0; m < how_many_signs; m++) {
          let Sign_choose = Math.floor(Math.random() * max_possible_Sign_Index);
          founded_signs.push(Signs[Sign_choose]);
        }
        for (let m = 0; m < how_many_numbers; m++) {
          let Number_choose = Math.floor(Math.random() * max_possible_Num);
          founded_numbers.push(Number_choose);
        }
        generated_moadele = `${founded_numbers[0]}`;
        for (let i = 0; i < how_many_signs; i++) {
          generated_moadele += `${founded_signs[i]}${founded_numbers[i + 1]}`;
        }
        // generated_moadele = ZeroDivisionCheck(
        //   generated_moadele,
        //   max_possible_Num
        // );
        // generated_moadele = checkDeciamlAnswer(
        //   generated_moadele,
        //   max_possible_Num
        // );
        let is_moadele_ExistBefore = await db.collection("questions").findOne({
          qus: generated_moadele,
        });
        if (!is_moadele_ExistBefore) {
          let Answer;
          let counter_j = 0;
          for (let j = 0; j < how_many_signs; j++) {
            if (founded_signs[j] != "!") {
              counter_j += 1;
            }
          }
          if (counter_j == how_many_signs) {
            Answer = eval(generated_moadele);
            console.log("eval is : " + Answer);
          }
          if (max_possible_Sign_Index == 3) {
            generated_moadele = replaceMathSymbols(generated_moadele);
          }
          const newMoadele = {
            qus: generated_moadele,
            ans: Answer,
            createdAt: new Date(),
          };
          await db.collection("questions").insertOne(newMoadele);
          loop_OP_Func = false;
          let result = [];
          result.push(generated_moadele);
          result.push(Answer);
          result.push(founded_signs);
          result.push(how_many_signs);
          return result;
        }
      }
    }
  } catch (err) {
    console.log("error in generate moadele :" + err);
  }
}
module.exports = make_Moadele;
