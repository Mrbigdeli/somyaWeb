/**
 * @param {string} input - معادله ورودی
 * @returns {string} - معادله خروجی
 */
function replaceMathSymbols(input) {
  // اگر هیچ‌کدوم از این علامت‌ها نباشه، همون رو برگردون
  if (!/[*/×÷]/.test(input)) {
    return input;
  }

  // اگر ورودی شامل * یا / بود، تبدیل کن به × و ÷
  if (input.includes("*") || input.includes("/")) {
    let output = input.replace(/\*/g, "×").replace(/\//g, "÷");
    return output;
  }

  // اگر ورودی شامل × یا ÷ بود، برگردون به * و /
  if (input.includes("×") || input.includes("÷")) {
    let output = input.replace(/×/g, "*").replace(/÷/g, "/");
    return output;
  }

  // در غیر این صورت، همون ورودی رو برگردون
  return input;
}

module.exports = replaceMathSymbols;
