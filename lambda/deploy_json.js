const fs = require("fs/promises");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();
const { Octokit } = require("@octokit/rest");

function change(currentTexts) {
  let texts; // textsを先に宣言
  if (
    currentTexts.charAt(0) === "[" &&
    currentTexts.charAt(currentTexts.length - 1) === "]"
  ) {
    texts = currentTexts.slice(1, -1);
  } else {
    texts = currentTexts;
  }

  let count = 0;
  let result = "";
  for (const text of texts) {
    if (text === "{") {
      count++;
    } else if (text === "}") {
      count--;
    }
    if (count === 0 && text === ",") {
      continue;
    }
    result += text;
  }
  return result;
}

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

// Octokitのインスタンスを作成
const octokit = new Octokit({
  auth: accessToken, // 認証トークンを設定
});

// デプロイ対象のリポジトリ情報
const owner = "enbipaipu"; // リポジトリの所有者
const repo = "test"; // リポジトリ名

// ファイルの内容を変更
const github_filePath = `https://api.github.com/repos/enbipaipu/test/contents/slid.json`; // 変更するファイルのパス

// ファイルの変更をコミット
async function deploy_json() {
  try {
    const filePath = path.join(__dirname, "test.json");
    const testJsonData = await fs.readFile(filePath, "utf8");

    const changed = change(testJsonData);

    const jsonData = JSON.parse(changed);
    const newFileContent = Buffer.from(jsonData).toString("base64");

    const {
      data: { sha },
    } = await octokit.repos.getContents({ owner, repo, path: github_filePath });

    // 変更内容をコミット
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: github_filePath,
      message: "Update file content",
      content: newFileContent,
      sha: sha,
    });

    console.log("File updated successfully!");
  } catch (error) {
    console.error("Error updating file:", error);
  }
}

deploy_json();

module.exports.deploy_json = deploy_json;
