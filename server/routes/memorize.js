const express = require("express");
const MemorizeController = require("../controllers/MemorizeController");
const router = express.Router();

router.post(
  "/ballCount",
  // checkTimestampToken,
  MemorizeController.BallsCount
);
router.post(
  "/ballColors",
  // checkTimestampToken,
  MemorizeController.BallColors
);
router.post(
  "/ballWords",
  // checkTimestampToken,
  MemorizeController.BallWords
);
router.use((err, req, res, next) => {
  console.log("from memo route middleware", err.message);
});
module.exports = router;
