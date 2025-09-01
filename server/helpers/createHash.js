const bcrypt = require("bcrypt");

const saltRounds = 10;

async function createHash(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.log("hash function error is: " + err);
    throw err;
  }
}

// createHash("admin_123");
module.exports = createHash;
// admin password = admin_123
