/**
 * حل معادله ریاضی و پیدا کردن معادله‌ای که جوابش بدون اعشار یا نهایت 1 رقم اعشار باشه.
 * @param {string} inputEquation - معادله اولیه مثل "5/3"
 * @returns {string} - معادله جدید با شرایط دلخواه یا همون معادله اصلی اگر شرایط رو داشت.
 */
function checkDeciamlAnswer(inputEquation, max_possible_Num) {
  // اول یه تابع کوچیک برای حل معادله بسازیم
  function evalEquation(equation) {
    try {
      // از eval برای حل استفاده می‌کنیم (یا هر لایبرری مثل mathjs)
      return eval(equation);
    } catch (e) {
      return null;
    }
  }

  // یه تابع برای چک کردن تعداد ارقام اعشار
  function hasNiceDecimal(num) {
    const str = num.toString();
    if (!str.includes(".")) return true; // اصلاً اعشار نداره
    const decimalPart = str.split(".")[1];
    return decimalPart.length <= 1;
  }

  // مرحله اول: حل معادله اصلی
  const originalResult = evalEquation(inputEquation);
  if (originalResult === null) {
    return "Invalid equation";
  }
  if (hasNiceDecimal(originalResult)) {
    return inputEquation; // شرایط رو داره → برگردون
  }

  // حالا معادله رو دستکاری کنیم
  const maxAttempts = 1000;
  let attempts = 0;
  const equationParts = inputEquation.split(/([+\-*/])/); // اعداد و عملگرها رو جدا کنیم

  while (attempts < maxAttempts) {
    attempts++;

    const newParts = equationParts.map((part) => {
      // اگر عدد بود → عوضش کن
      if (!isNaN(part)) {
        const randomDigit =
          Math.floor(Math.random() * (max_possible_Num - 1)) + 1;
        return randomDigit.toString();
      }
      // اگر عملگر بود → همون رو برگردون
      return part;
    });

    const newEquation = newParts.join("");
    const newResult = evalEquation(newEquation);

    if (newResult !== null && hasNiceDecimal(newResult)) {
      return newEquation, newResult;
    }
  }

  // اگر بعد از تلاش زیاد پیدا نکردیم، همون معادله اصلی رو بده
  return inputEquation, originalResult;
}
module.exports = checkDeciamlAnswer;
