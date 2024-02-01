import axios from "axios";
import { load } from "cheerio";

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

export async function update_json() {
  console.log("jsonのアップデートを行います。");
  scrape("https://moocs.iniad.org/courses");

  console.log("jsonのアップデートが終了しました");
  return;
}

update_json();
