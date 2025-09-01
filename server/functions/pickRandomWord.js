const { getDataBase, client } = require("../helpers/connectDB");
async function pickRandomWords(count) {
  const result = {};
  try {
    const db = await getDataBase();
    // پیدا کردن بیشترین آیدی (فرض بر اینکه فیلد id عددیه)
    const lastEntry = await db
      .collection("Allwords")
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    if (lastEntry.length === 0) return {};

    const maxId = lastEntry[0].id;

    // تولید idهای تصادفی یکتا بین 1 تا maxId شامل هر دو
    const randomIds = new Set();
    while (randomIds.size < count) {
      const randId = Math.floor(Math.random() * (maxId - 1 + 1)) + 1; // شامل 1 و maxId
      randomIds.add(randId);
    }

    const idsArray = Array.from(randomIds);

    // دریافت کلمات مربوط به آیدی‌ها از دیتابیس
    const words = await db
      .collection("Allwords")
      .find({ id: { $in: idsArray } })
      .toArray();

    // تبدیل لیست به فرمت result دلخواه
    let index = 1;
    for (const wordObj of words) {
      let leng_word = wordObj.word.length;
      result[index.toString()] = {
        word: wordObj.word,
        lang: wordObj.lang,
        leng: leng_word,
      };
      index++;
    }

    return result;
  } catch (err) {
    console.error("خطا در دریافت داده‌ها از Mongo:", err);
    return {};
  } finally {
    await client.close();
  }
}
module.exports = pickRandomWords;
