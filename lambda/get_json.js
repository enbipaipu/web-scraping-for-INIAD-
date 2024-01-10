const fetch = require("node-fetch");
const fs = require("fs/promises");

// function changes(currentTexts) {
//   let texts; // textsを先に宣言
//   // currentTextsの最初と最後の文字をチェックして条件に応じてtextsを定義
//   if (
//     currentTexts.charAt(0) === "[" &&
//     currentTexts.charAt(currentTexts.length - 1) === "]"
//   ) {
//     texts = currentTexts.slice(1, -1);
//   } else {
//     texts = currentTexts;
//   }

//   let count = 0;
//   let result = "[";
//   for (const text of texts) {
//     if (text === "{") {
//       count++;
//     } else if (text === "}") {
//       count--;
//     }
//     result += text;
//     if (count === 0 && text === "}") {
//       result += ",";
//     }
//   }

//   // 正確に最後のカンマを取り除く
//   result = result.replace(/,\s*$/, "");

//   result += "]";
//   return result;
// }

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

const owner = "jun-eg";
const repo = "deadline-json-fork";
const github_filePath = "data.json";

async function get_json() {
  console.log("get_jsonを実行します。");

  try {
    // GitHub APIを通じてファイルの内容を取得します
    const getResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${github_filePath}`,
      {
        headers: {
          Authorization: `${accessToken}`,
          Accept: "application/vnd.github.v3.raw",
        },
      }
    );

    if (!getResponse.ok) {
      throw new Error("GitHubからファイルを取得する際にエラーが発生しました。");
    }

    // テキストレスポンスとしてファイルの内容を取得します
    const textContent = await getResponse.text();

    // ファイルシステムにJSONデータとして書き込みます
    await fs.writeFile("test.json", textContent);
    console.log("JSON データを test.json に書き込みました。");
  } catch (error) {
    console.error("データを取得できませんでした:", error);
  }
}

get_json();

module.exports.get_json = get_json;
