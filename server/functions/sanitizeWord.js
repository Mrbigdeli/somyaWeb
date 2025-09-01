function sanitizeWord(word) {
  if (word === undefined || word === null) return "";
  // تبدیل هر ورودی به رشته
  const raw = `${word}`;
  const cleaned = raw.trim();
  // فقط اگر ساختار واقعی کد HTML یا JS بود، رد می‌کنیم
  const htmlTagPattern = /<\s*\w+[^>]*>/i; // <tag ...>
  const htmlCloseTagPattern = /<\s*\/\s*\w+\s*>/i; // </tag>
  const jsEventAttrPattern = /\b(on\w+)\s*=/i; // onload=, onclick=, ...
  const javascriptUriPattern = /javascript:/i; // href="javascript:..."
  const dataUriPattern = /data:(text|application)\/\w+;base64,/i;

  const hasMaliciousCode =
    htmlTagPattern.test(cleaned) ||
    htmlCloseTagPattern.test(cleaned) ||
    jsEventAttrPattern.test(cleaned) ||
    javascriptUriPattern.test(cleaned) ||
    dataUriPattern.test(cleaned);

  if (hasMaliciousCode) {
    return "";
  }

  return cleaned;
}

module.exports = sanitizeWord;
