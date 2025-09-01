function ZeroDivisionCheck(equation, max_possible_Num) {
  let newEquation = "";
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "/" && equation[i + 1] === "0") {
      // تولید یک عدد تصادفی بین 1 تا 9 (می‌تونیم محدوده‌ رو تغییر بدیم)
      const randomDigit =
        Math.floor(Math.random() * (max_possible_Num - 1)) + 1;
      newEquation += "/" + randomDigit;
      i++; // صفر رو رد کن
    } else {
      newEquation += equation[i];
    }
  }
  return newEquation;
}
module.exports = ZeroDivisionCheck;
