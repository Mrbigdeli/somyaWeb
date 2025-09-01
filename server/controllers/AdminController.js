const { getDataBase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const formatWord = require("../functions/formatWord");
const sanitizeWord = require("../functions/sanitizeWord");
const getCurrentTime_24Base = require("../functions/getCurrentTime-24base");
const getTodayJalaliDate = require("../functions/getTodayJalaliDate");
const validateLangWord = require("../functions/validateLangWord");
const insertAllWords = require("../functions/syncWordsJob");
const AdminController = {
  newWord_Func: async (req, res) => {
    try {
      const db = await getDataBase();
      const supported_lang = [
        "en",
        "ar",
        "fa",
        "ur",
        "ru",
        "fr",
        "es",
        "it",
        "zh",
        "ja",
        "ko",
        "hi",
      ];
      let requested_lang = req.body.lang;
      let requested_group = req.body.group;
      let requested_word = req.body.word;
      let lang_counter = 0;
      for (let i = 0; i < supported_lang.length; i++) {
        if (requested_lang != supported_lang[i]) {
          lang_counter += 1;
        }
      }
      if (requested_word == "" || lang_counter == supported_lang.length) {
        return returnStatus(res, 500, true, "nothing???", {
          errorCode: 501,
          word: requested_word,
          lang: requested_lang,
        });
      }
      requested_word = sanitizeWord(requested_word);
      requested_word = validateLangWord(requested_word, requested_lang);
      if (requested_word == "" || requested_word == " ") {
        return returnStatus(
          res,
          500,
          true,
          "word exist before or has sth Bad!!",
          {
            errorCode: 502,

            word: requested_word,
          }
        );
      }
      requested_word = formatWord(requested_word);
      const isRequested_Word_Exist = await db.collection("Allwords").findOne({
        word: requested_word,
      });
      if (isRequested_Word_Exist) {
        return returnStatus(res, 503, true, "word exist before", {
          id: isRequested_Word_Exist.id,
        });
      }
      const lastDoc = await db
        .collection("Allwords")
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray();

      let newId = 1; // اگر کالکشن خالی بود
      if (lastDoc.length > 0 && typeof lastDoc[0].id === "number") {
        newId = lastDoc[0].id + 1;
      }
      let currentTime = getCurrentTime_24Base();
      let currentDate = getTodayJalaliDate();
      const newWord = {
        word: `${requested_word}`,
        id: newId,
        createdAt_Date: `${currentDate}`,
        createdAt_Time: `${currentTime}`,
        lang: `${requested_lang}`,
        group: `${requested_group}`,
        isWordChecked: false,
        check_Date: "",
        check_Time: "",
      };
      await db.collection("Allwords").insertOne(newWord);
      return returnStatus(res, 200, false, "done successfully", {
        wordID: newWord.id,
      });
    } catch (err) {
      console.log(err);
      return returnStatus(
        res,
        500,
        true,
        "Something went wrong in catching new word",
        {
          errorCode: 500,
          error: err,
        }
      );
    }
  },
  addBackendWords: async (req, res) => {
    try {
      const result = await insertAllWords();
      if (!result) {
        return returnStatus(
          res,
          500,
          true,
          "Something went wrong in adding word",
          {
            errorCode: 546,
          }
        );
      }
      return returnStatus(res, 200, false, "words added successfully", {
        result,
      });
    } catch (err) {
      console.log(err);
      return returnStatus(
        res,
        500,
        true,
        "Something went wrong in adding word",
        {
          errorCode: 544,
          error: err,
        }
      );
    }
  },
};

module.exports = AdminController;
