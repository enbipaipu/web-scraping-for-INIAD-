import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import { Octokit } from "@octokit/rest";
import { inspect } from "util";

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

const owner = "enbipaipu";
const repo = "test";
const github_filePath = "slid.json";

export async function deploy_json(json, is_) {
  if (json === undefined || !is_) return;
  console.log(inspect(json, { showHidden: false, depth: null }));
  console.log("boolean: ", is_);
  console.log("デプロイを開始します");

  try {
    const newDataToSendToGitHub = JSON.stringify(json, null, 2);

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
