import fetch from "node-fetch";

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

const owner = "jun-eg";
const repo = "test-zip";
const github_filePath = "data/slide.json";

export async function get_json() {
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
    const textContent = getResponse.text();

    // ファイルシステムにJSONデータとして書き込みます
    console.log("JSON データを 取得しました。");

    return textContent;
  } catch (error) {
    console.error("データを取得できませんでした:", error);
  }
}

get_json();
