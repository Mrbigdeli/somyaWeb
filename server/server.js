require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const returnStatus = require("./helpers/returnStatus");
const userRouter = require("./routes/users");
const questionRouter = require("./routes/question");
const memoRouter = require("./routes/memorize");
const adminRouter = require("./routes/admin");
const deleteOldData = require("./helpers/deleteUseLessData");
const UpdateDailyTry = require("./helpers/UpdateDailyTry");
// const generateRsaKeys = require("./MiddleWares/generateKeys");
// generateRsaKeys();
const app = express();
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "https://somyaweb.liara.run/",
    //   "https://admin-codexp.liara.run/",
    //   "http://codexp.ir",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use("/users", userRouter);
app.use("/question", questionRouter);
app.use("/memo", memoRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use((req, res, next) => {
  return returnStatus(res, 404, true, "Not found55");
});
const port = process.env.PORT || 3000;

cron.schedule("0 0 * * *", () => {
  console.log("🕕 اجرای کرون‌جاب: پاک‌سازی اطلاعات دیروز");
  deleteOldData();
  UpdateDailyTry();
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
