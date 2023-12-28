const { error } = require("console");
const fs = require("fs/promises");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

async function deploy_json() {
  console.log("jsonのデプロイを開始します。");
  try {
    const filePath = path.join(__dirname, "test.json");
    const testJsonData = await fs.readFile(filePath, "utf8");

    const jsonData = JSON.parse(testJsonData);
    const contentEncoded = Buffer.from(jsonData).toString("base64");

    const getResponse = await fetch(
      `https://api.github.com/repos/jun-eg/test-zip/contents/data/slide.json`,
      {
        headers: {
          Authorization: "process.env.SLIDE_JSON_ACCESS_TOKEN",
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const getFileData = await getResponse.json();
    const sha = getFileData.sha;

    const putResponse = await fetch(
      `https://api.github.com/repos/jun-eg/test-zip/contents/data/slide.json`,
      {
        method: "PUT",
        headers: {
          Authorization: "process.env.SLIDE_JSON_ACCESS_TOKEN",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "slide.jsonを更新",
          content: contentEncoded,
          sha: sha,
          branch: "main",
        }),
      }
    );

    if (!putResponse.ok) {
      console.error("HTTP Status:", putResponse.status);
      console.error("Status Text:", putResponse.statusText);

      // エラーレスポンスボディをテキストとして取得
      const errorBody = await putResponse.text();

      // コンソールにエラーボディを出力
      console.error("Error Body:", errorBody);

      throw new Error(
        `GitHubへのファイル更新に失敗しました。 Status: ${putResponse.status}`
      );
    }

    console.log("JSON データを GitHub 上に更新しました。");
    return;
  } catch (error) {
    console.error("データのデプロイに失敗しました:", error);
  }
}
deploy_json();

module.exports.deploy_json = deploy_json;
