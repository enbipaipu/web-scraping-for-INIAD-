import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import { Octokit } from "@octokit/rest";
import { readFileSync } from "fs";

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

const owner = "enbipaipu";
const repo = "test";
const github_filePath = "slid.json";

export async function deploy_json(json) {
  console.log("デプロイを開始します");
  try {
    const jsonData = json;
    const newDataToSendToGitHub = {
      jsonData,
    };

    const githubData = Buffer.from(
      JSON.stringify(newDataToSendToGitHub)
    ).toString("base64");

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
      content: githubData,
      sha: getfiledata.sha,
    });

    console.log("Data sent to GitHub successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
