const { getDataBase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
function factorial(Input) {
  i = 1;
  for (let mk = 1; mk <= Input; mk++) {
    i = i * mk;
  }
  return i;
}
module.exports = factorial;
