import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import { Octokit } from "@octokit/rest";

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

const owner = "enbipaipu";
const repo = "test";
const github_filePath = "slid.json";

export async function deploy_json(json) {
  console.log("デプロイを開始します");
  console.log(json);

  console.log("---------------");
  const changed_json = JSON.parse(json);
  console.log(changed_json);
  try {
    const newDataToSendToGitHub = JSON.stringify(changed_json, null, 2);

    const octokit = new Octokit({
      auth: accessToken,
    });

    const getResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${github_filePath}`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const getfiledata = await getResponse.json();

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: github_filePath,
      message: "Update data file",
      content: Buffer.from(newDataToSendToGitHub).toString("base64"),
      sha: getfiledata.sha,
    });

    console.log("データが正常にGitHubに送信されました!");
  } catch (error) {
    console.error("エラー:", error);
  }
}
