import axios from "axios";
import { load } from "cheerio";

async function scrape(url: string) {
  try {
    const response = await axios.get(url);
    const $ = load(response.data);

    const title = $("title").text();
    console.log(`ページのタイトル：${title}`);
  } catch (error) {
    console.log(`エラーが発生しました：${error}`);
  }
}

//jsonにないURLをmoocsから取得する関数
export async function update_json(
  json: string | undefined
): Promise<[string, boolean] | [undefined, false]> {
  if (json === undefined) return [undefined, false];
  console.log("jsonのアップデートを行います。");

  scrape("https://moocs.iniad.org/courses");

  console.log("jsonのアップデートが終了しました");
  const JSON_CHANGE = JSON.parse(json);
  return [JSON_CHANGE, true];
}

update_json('{"key": "value"}');
