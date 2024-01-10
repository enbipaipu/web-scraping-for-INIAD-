const fetch = require("node-fetch");
const fs = require("fs/promises");

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
