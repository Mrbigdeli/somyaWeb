const { getDataBase, client } = require("../helpers/connectDB");
const WordsMap = require("../Utils/words");
const sanitizeWord = require("../functions/sanitizeWord");
const validateLangWord = require("../functions/validateLangWord");
const formatWord = require("../functions/formatWord");
const getCurrentTime_24Base = require("../functions/getCurrentTime-24base");
const getTodayJalaliDate = require("../functions/getTodayJalaliDate");
function getLangFromKey(key) {
  return key.startsWith("fa") ? "fa" : "en";
}

function getTypeFromKey(key) {
  return key.replace(/^(en|fa)/, "");
}
async function insertAllWords() {
  try {
    const db = await getDataBase();
    const allwordsCollection = db.collection("Allwords");
    const lastItem = await allwordsCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    let currentId = lastItem.length > 0 ? lastItem[0].id + 1 : 1;
    let currentTime = getCurrentTime_24Base();
    let currentDate = getTodayJalaliDate();
    const insertedWords = [];
    // شمارنده‌ها
    let duplicateCount = 0;
    let duplicateWords = [];
    let unformatableWords = [];
    let dangerousCount = 0;
    let danger_words = [];
    let languageMismatchCount = 0;
    let languageMismatchWords = [];
    let newWords_withoutProblem_count = 0;
    for (const [groupName, wordsArray] of Object.entries(WordsMap)) {
      const lang = getLangFromKey(groupName);
      const group = getTypeFromKey(groupName);
      for (const originalWord of wordsArray) {
        // مرحله 1: پاک‌سازی
        const sanitized = sanitizeWord(originalWord);
        if (!sanitized) {
          dangerousCount++;
          danger_words.push(originalWord);
          continue;
        }
        // مرحله 2: اعتبارسنجی
        const validated = validateLangWord(sanitized, lang);
        if (!validated) {
          languageMismatchCount++;
          languageMismatchWords.push(sanitized);
          continue;
        }
        // مرحله 3: فرمت
        const formattedWord = formatWord(validated);
        if (!formattedWord) {
          dangerousCount++; // اگر به دلایلی فرمت نشد، به عنوان مشکوک در نظر بگیریم
          unformatableWords.push(validated);
          continue;
        }
        // مرحله 4: تکراری بودن
        const isDuplicate = await allwordsCollection.findOne({
          word: formattedWord,
          lang,
          group,
        });
        if (isDuplicate) {
          duplicateCount++;
          duplicateWords.push(formattedWord);
          continue;
        }
        // مرحله 5: افزودن به لیست
        const newWord = {
          word: formattedWord,
          id: currentId++,
          createdAt_Date: currentDate,
          createdAt_Time: currentTime,
          lang,
          group,
          isWordChecked: false,
          check_Date: "",
          check_Time: "",
        };
        newWords_withoutProblem_count++;
        insertedWords.push(newWord);
      }
    }
    if (insertedWords.length > 0) {
      await allwordsCollection.insertMany(insertedWords);
      console.log(`${insertedWords.length} کلمه جدید با موفقیت ذخیره شد.`);
    } else {
      console.log("کلمه جدیدی ذخیره نشد.");
    }
    const result = {
      duplicateCount,
      dangerousCount,
      languageMismatchCount,
      newWords_withoutProblem_count,
      unformatableWords,
      danger_words,
      duplicateWords,
      languageMismatchWords,
    };
    return result;
  } catch (error) {
    console.error("خطا در ذخیره کلمات:", error);
  }
}

module.exports = insertAllWords;
