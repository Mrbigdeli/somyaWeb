const crypto = require("crypto");

const maxDelay = 30 * 1000; 
const SECRET_KEY = "FJFMMCKkdkdnknjfnjfvfn_rjfcvnvnfjj748jcje8ffj#kfkfimd";

function checkTimestampToken(req, res, next) {
  const token = req.headers["x-timestamp-token"];

  if (!token || !token.includes(":")) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid or missing timestamp token" });
  }

  const [timestampStr, signature] = token.split(":");
  const timestamp = parseInt(timestampStr);
  const now = Date.now();

  if (isNaN(timestamp) || Math.abs(now - timestamp) > maxDelay) {
    return res
      .status(408)
      .json({ error: true, message: "Expired timestamp token" });
  }

  // فرض کنیم userIdentifier از هدر بگیریم یا از پارامتر دیگه
  const userIdentifier = req.headers["x-user-id"] || ""; // این خط بسته به نیاز تو قابل تغییره

  const data = `${timestamp}:${userIdentifier}`;
  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid signature in token" });
  }

  next(); // اوکیه، ادامه بده
}

module.exports = checkTimestampToken;
