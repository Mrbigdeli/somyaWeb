function validateLangWord(word, lang) {
  const patterns = {
    // انگلیسی
    en: /^[\p{Script=Latin}0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // فارسی
    fa: /^[\u0600-\u06FF0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // عربی
    ar: /^[\u0600-\u06FF0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // اردو
    ur: /^[\u0600-\u06FF0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // روسی
    ru: /^[\u0400-\u04FF0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // فرانسوی
    fr: /^[\p{Script=Latin}0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // اسپانیایی
    es: /^[\p{Script=Latin}0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // ایتالیایی
    it: /^[\p{Script=Latin}0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // چینی
    zh: /^[\u4e00-\u9fff0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // ژاپنی
    ja: /^[\u3040-\u30FF\u4e00-\u9FFF0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // کره‌ای
    ko: /^[\u1100-\u11FF\uAC00-\uD7AF0-9\s\u200C\u2011\-’'()&+.,]+$/u,

    // هندی
    hi: /^[\u0900-\u097F0-9\s\u200C\u2011\-’'()&+.,]+$/u,
  };

  const regex = patterns[lang];
  if (!regex || !word) return "";
  return regex.test(word) ? word : "";
}

module.exports = validateLangWord;
