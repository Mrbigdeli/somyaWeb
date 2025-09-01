function formatWord(word) {
  if (word === undefined || word === null) return "";

  // تبدیل هر ورودی به رشته
  const raw = String(word).trim();

  // اگر فقط عدد و فاصله باشه، فقط فاصله‌ها رو حذف کن
  const isNumber = /^[0-9\s]+$/.test(raw);
  if (isNumber) {
    return raw.replace(/\s+/g, "");
  }

  // بررسی اینکه فقط حروف انگلیسی و فاصله باشه
  const isEnglish = /^[A-Za-z\s]+$/.test(raw);
  if (isEnglish) {
    const hasUpperCase = /[A-Z]/.test(raw);
    let formatted = hasUpperCase ? raw.toLowerCase() : raw;
    return formatted.replace(/\s+/g, "-");
  }

  // سایر زبان‌ها: فقط فاصله رو با خط تیره جایگزین کن
  return raw.replace(/\s+/g, "-");
}

module.exports = formatWord;
