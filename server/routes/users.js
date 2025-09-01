const express = require("express");
const userController = require("../controllers/userController");
const checkTimestampToken = require("../MiddleWares/checkTimestampToken");
const router = express.Router();

router.get(
  "/EIQMake",
  // checkTimestampToken,
  userController.EIQMake
);
router.post("/checkAnswer", userController.CheckAnswer);
router.post("/updateInfo", userController.updateInfo);
router.post("/leftLives-Minus", userController.LeftLivesMinus);
router.post("/catchPass", userController.passCatch);
router.post("/checkUserTries", userController.UserTry);
router.post("/saveHighScore", userController.SaveHighScore);
router.post("/UserTriesMinusOne", userController.MinusOne_UserTry);
router.use((err, req, res, next) => {
  console.log("from users route middleware", err.message);
});
module.exports = router;
