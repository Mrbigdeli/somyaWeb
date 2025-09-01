const { getDataBase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
function make_Choices(Array_Input) {
  try {
    let result_Array;
    let obj_func = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };
    // const db = await getDataBase();
    let x1, x2, x3;
    let Answer = Array_Input[1];
    let choosed_Sign = Array_Input[2];
    if (choosed_Sign[0] == "+") {
      let Path_choose = Math.floor(Math.random() * 14);
      if (Path_choose == 0) {
        // 1up 1down 2up
        x1 = Answer + 1;
        x2 = Answer - 1;
        x3 = Answer + 10;
      } else if (Path_choose == 1) {
        // 2up 2down 1up
        x1 = Answer + 2;
        x2 = Answer - 2;
        x3 = Answer + 10;
      } else if (Path_choose == 2) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 1;
        x3 = Answer - 10;
      } else if (Path_choose == 3) {
        // 2up 2down 1down
        x1 = Answer + 2;
        x2 = Answer - 2;
        x3 = Answer - 10;
      } else if (Path_choose == 4) {
        // 2up 2down 1down
        x1 = Answer + 20;
        x2 = Answer - 20;
        x3 = Answer - 1;
      } else if (Path_choose == 5) {
        // 2up 2down 1down
        x1 = Answer + 10;
        x2 = Answer - 10;
        x3 = Answer + 1;
      } else if (Path_choose == 6) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 10;
        x3 = Answer + 2;
      } else if (Path_choose == 7) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 10;
        x3 = Answer + 20;
      } else if (Path_choose == 8) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 20;
        x3 = Answer + 30;
      } else if (Path_choose == 9) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 10;
        x3 = Answer - 20;
      } else if (Path_choose == 10) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 20;
        x3 = Answer - 30;
      } else if (Path_choose == 11) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 5;
        x3 = Answer - 10;
      } else if (Path_choose == 12) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 5;
        x3 = Answer + 10;
      } else if (Path_choose == 13) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 5;
        x3 = Answer - 5;
      }
    } else if (choosed_Sign[0] == "-") {
      let Path_choose = Math.floor(Math.random() * 14);
      if (Path_choose == 0) {
        // 1up 1down 2up
        x1 = Answer + 1;
        x2 = Answer - 1;
        x3 = Answer + 10;
      } else if (Path_choose == 1) {
        // 2up 2down 1up
        x1 = Answer + 2;
        x2 = Answer - 2;
        x3 = Answer + 10;
      } else if (Path_choose == 2) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 1;
        x3 = Answer - 10;
      } else if (Path_choose == 3) {
        // 2up 2down 1down
        x1 = Answer + 2;
        x2 = Answer - 2;
        x3 = Answer - 10;
      } else if (Path_choose == 4) {
        // 2up 2down 1down
        x1 = Answer + 20;
        x2 = Answer - 20;
        x3 = Answer - 1;
      } else if (Path_choose == 5) {
        // 2up 2down 1down
        x1 = Answer + 10;
        x2 = Answer - 10;
        x3 = Answer + 1;
      } else if (Path_choose == 6) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 10;
        x3 = Answer + 2;
      } else if (Path_choose == 7) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 10;
        x3 = Answer + 20;
      } else if (Path_choose == 8) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 20;
        x3 = Answer + 30;
      } else if (Path_choose == 9) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 10;
        x3 = Answer - 20;
      } else if (Path_choose == 10) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 20;
        x3 = Answer - 30;
      } else if (Path_choose == 11) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer - 5;
        x3 = Answer - 10;
      } else if (Path_choose == 12) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 5;
        x3 = Answer + 10;
      } else if (Path_choose == 13) {
        // 2up 2down 1down
        x1 = Answer + 1;
        x2 = Answer + 5;
        x3 = Answer - 5;
      }
    } else if (
      choosed_Sign[0] == "×" ||
      choosed_Sign[0] == "÷" ||
      choosed_Sign[0] == "*" ||
      choosed_Sign[0] == "/"
    ) {
      console.log("i'm Here");
      let Path_choose = Math.floor(Math.random() * 2);
      if (Path_choose == 0) {
        x1 = Answer * 2;
        x2 = Answer * 5;
        x3 = Answer + 10;
      } else if (Path_choose == 1) {
        x1 = Answer / 2;
        x2 = Answer * 2;
        x3 = Answer + 10;
      }
    }
    let counter_func = 4;
    while (counter_func > 0) {
      let place_choose = Math.floor(Math.random() * 5);
      if (obj_func[place_choose] == 0) {
        if (counter_func == 4) {
          obj_func[place_choose] = Answer;
        } else if (counter_func == 3) {
          obj_func[place_choose] = x2;
        } else if (counter_func == 2) {
          obj_func[place_choose] = x1;
        } else if (counter_func == 1) {
          obj_func[place_choose] = x3;
        }
        counter_func -= 1;
      }
    }
    result_Array = Object.values(obj_func);
    return result_Array;
  } catch (err) {
    console.log("error in make choicess!! :" + err);
  }
}
module.exports = make_Choices;
