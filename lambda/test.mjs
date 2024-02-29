const Owner = "enbipaipu";
const Repo = "test";
const github_filePath = "slid.json";
const accessToken = `${process.env.SLIDE_JSON_ACCESS_TOKEN}`;

async function test() {
  const getResponse2 = await fetch(
    `https://api.github.com/repos/${Owner}/${Repo}/contents/${github_filePath}`,
    {
      headers: {
        Authorization: ` ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const jsonResponse = await getResponse2.json(); // レスポンスをJSONとして一度だけ解析する
  console.log(jsonResponse);
  console.log("---------");
  console.log(jsonResponse.sha); // 保存したJSONオブジェクトからshaプロパティを取得する
}

test();
