const express = require("express");
const QuestionController = require("../controllers/QuestionController");
// const checkTimestampToken = require("../MiddleWares/checkTimestampToken");
const router = express.Router();
router.post("/catchNew", QuestionController.makeNewQuestion);
router.post("/makeFirstQus", QuestionController.makeNewQuestion);
router.use((err, req, res, next) => {
  console.log("from team route middleware", err.message);
});
module.exports = router;
