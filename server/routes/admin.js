const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.post("/newWord", AdminController.newWord_Func);
router.get("/addBackendWords", AdminController.addBackendWords);
router.use((err, req, res, next) => {
  console.log("from admin route middleware", err.message);
});
module.exports = router;
