const fetch = require("node-fetch");
const fs = require("fs/promises");

async function get_json() {
  console.log("get_jsonを実行します。");
  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default(
      "https://github.com/jun-eg/test-zip/blob/main/data/slide.json"
    );
    const data = await response.json();
    fs.writeFile(
      "test.json",
      JSON.stringify(data.payload.blob.rawLines, null, 2)
    );
    console.log("JSON データを test.json に書き込みました。");
    return;
  } catch (error) {
    console.error("データを取得できませんでした:", error);
  }
}

get_json();

module.exports.get_json = get_json;
