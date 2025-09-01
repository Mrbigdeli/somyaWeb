const jalaali = require("jalaali-js");

function getTodayJalaliDate() {
  const now = new Date();
  const jDate = jalaali.toJalaali(now);

  // ماه‌ها به صورت نام فارسی
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const year = jDate.jy;
  const monthName = months[jDate.jm - 1]; // jm ماه شمسی (1 تا 12)
  const day = jDate.jd;

  // فرمت خروجی: 1403-خرداد-23
  return `${year}-${monthName}-${day}`;
}

module.exports = getTodayJalaliDate;
