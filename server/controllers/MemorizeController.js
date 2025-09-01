const { getDataBase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const getRandomInt = require("../functions/generateRandomINT");
const pickRandomColorsWithCodes = require("../functions/pickUniqueColors");
const pickRandomWords = require("../functions/pickRandomWord");
const syncWordsToDB = require("../functions/syncWordsJob");
const MemorizeController = {
  BallsCount: async (req, res) => {
    try {
      let BallsCount = getRandomInt(3, 6);
      return returnStatus(
        res,
        200,
        false,
        "everyThing is right in counting balls",
        {
          ballcount: BallsCount,
        }
      );
    } catch (err) {
      console.log(err);
      return returnStatus(res, 500, true, "Something went wrong");
    }
  },
  BallColors: async (req, res) => {
    let ball_count = req.body.ballCount;
    let ball_count_Int = parseInt(ball_count);
    let pickedColors = pickRandomColorsWithCodes(ball_count_Int);
    return returnStatus(
      res,
      200,
      false,
      "everyThing is right in pickingColors",
      {
        pickedColors: pickedColors,
      }
    );
  },
  BallWords: async (req, res) => {
    let ball_count = req.body.ballCount;
    let ball_count_Int = parseInt(ball_count);
    let pickedWords = await pickRandomWords(ball_count_Int);
    return returnStatus(
      res,
      200,
      false,
      "everyThing is right in pickingWords",
      {
        pickedWords: pickedWords,
      }
    );
  },
};

module.exports = MemorizeController;
