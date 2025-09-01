const colorCodesMap = require("../Utils/colorCodes"); // اگر فایل جدا ساختی، اینو بذار

// function pickRandomColorsWithCodes(ball_count_Int) {
//   const allColors = Object.keys(colorCodesMap);

//   if (ball_count_Int > allColors.length) {
//     throw new Error("تعداد درخواستی بیشتر از تعداد رنگ‌های موجود است.");
//   }
//   const colorsCopy = [...allColors];
//   const result = [];
//   for (let i = 0; i < ball_count_Int; i++) {
//     // انتخاب رنگ تصادفی از لیست
//     const randomColorIndex = Math.floor(Math.random() * colorsCopy.length);
//     const colorName = colorsCopy.splice(randomColorIndex, 1)[0];

//     // انتخاب کد رنگی تصادفی برای اون رنگ
//     const codesForColor = colorCodesMap[colorName];
//     if (!codesForColor || codesForColor.length === 0) {
//       throw new Error(`هیچ کد رنگی برای "${colorName}" تعریف نشده.`);
//     }

//     const codeIndex = Math.floor(Math.random() * codesForColor.length);
//     const hexCode = codesForColor.splice(codeIndex, 1)[0];

//     result.push({ name: colorName, code: hexCode });
//   }

//   return result;
// }
function pickRandomColorsWithCodes(ball_count_Int) {
  const colors = Object.keys(colorCodesMap);
  if (ball_count_Int > colors.length) {
    throw new Error("درخواست بیشتر از تعداد رنگ‌های موجود است.");
  }

  const usedColors = new Set(); // برای جلوگیری از تکرار رنگ
  const result = [];

  while (result.length < ball_count_Int) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const colorName = colors[randomIndex];

    if (usedColors.has(colorName)) {
      continue; // اگه قبلاً استفاده شده، برو سراغ رنگ بعدی
    }

    const colorCodes = colorCodesMap[colorName];
    if (!colorCodes || colorCodes.length === 0) {
      throw new Error(`کد رنگ برای "${colorName}" موجود نیست.`);
    }

    const randomCodeIndex = Math.floor(Math.random() * colorCodes.length);
    const colorCode = colorCodes[randomCodeIndex];

    result.push({ name: colorName, code: colorCode });
    usedColors.add(colorName); // علامت‌گذاری به‌عنوان استفاده‌شده
  }

  return result;
}
module.exports = pickRandomColorsWithCodes;
