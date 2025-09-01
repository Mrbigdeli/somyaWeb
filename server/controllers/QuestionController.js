const { getDataBase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
// const createJWT = require("../helpers/createJWT");
const make_Moadele = require("../functions/moadele_Maker");
const make_choices = require("../functions/choice_maker");
const QuestionController = {
  makeNewQuestion: async (req, res) => {
    try {
      const db = await getDataBase();
      let generated_One = await make_Moadele(req.body.IEQ);
      console.log("G-ONE: " + generated_One);
      let generated_choices = make_choices(generated_One);
      console.log("G-TWO: " + generated_choices);
      return returnStatus(res, 200, false, "question is ready", {
        qus: generated_One[0],
        choice1: generated_choices[0],
        choice2: generated_choices[1],
        choice3: generated_choices[2],
        choice4: generated_choices[3],
      });
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong in 005");
    }
    // finally {
    //   await client.close();
    // }
  },
};

module.exports = QuestionController;
