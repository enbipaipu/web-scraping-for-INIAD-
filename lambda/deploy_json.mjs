import fetch from "node-fetch";
import { Octokit } from "@octokit/rest";
import { inspect } from "util";

const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

const Owner = "enbipaipu";
const Repo = "test";
const github_filePath = "slid.json";

export async function deploy_json(json, is_finish) {
  if (json === undefined || !is_finish) return;

  console.log(inspect(json, { showHidden: false, depth: null }));
  console.log("boolean: ", is_finish);
  console.log("デプロイを開始します");

  try {
    const newDataToSendToGitHub = JSON.stringify(json, null, 2);

    const getResponse = await fetch(
      `https://api.github.com/repos/${Owner}/${Repo}/contents/${github_filePath}`,
      {
        headers: {
          Authorization: ` ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const getfiledata = await getResponse.json();

    console.log(await getfiledata);

    const octokit = new Octokit({
      auth: accessToken,
    });
    console.log("-------------");
    await octokit.repos.createOrUpdateFileContents({
      owner: Owner,
      repo: Repo,
      path: github_filePath,
      message: "Update data file",
      content: Buffer.from(newDataToSendToGitHub).toString("base64"),
      sha: await getfiledata.sha,
    });

    console.log("データが正常にGitHubに送信されました!");
  } catch (error) {
    console.error("エラー:", error);
  }
}
deploy_json("", true);
