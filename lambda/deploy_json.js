const fs = require("fs/promises");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();
const { Octokit } = require("@octokit/rest");

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

const owner = "enbipaipu";
const repo = "test";
const github_filePath = "slid.json";

async function deploy_json() {
  try {
    const filePath = path.join(__dirname, "test.json");
    const testJsonData = await fs.readFile(filePath, "utf8");

    const jsonData = JSON.parse(testJsonData);
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

module.exports.deploy_json = deploy_json;
