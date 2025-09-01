function getRandomInt(min, max) {
  min = Math.ceil(min); // گرد کردن به بالا (برای اطمینان از عدد صحیح)
  max = Math.floor(max); // گرد کردن به پایین
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = getRandomInt;
