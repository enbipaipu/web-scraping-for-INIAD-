const { default: axios } = require("axios");
const { load } = require("cheerio");

async function scrape(url) {
  try {
    const response = await axios.get(url);
    const $ = load(response.data);

    const title = $("title").text();
    console.log(`ページのタイトル：${title}`);
  } catch (error) {
    console.log(`エラーが発生しました：${error}`);
  }
}

async function update_json() {
  console.log("jsonのアップデートを行います。");
  scrape("https://moocs.iniad.org/courses");
  console.log("jsonのアップデートが終了しました");
  return;
}

update_json();

module.exports.update_json = update_json;
