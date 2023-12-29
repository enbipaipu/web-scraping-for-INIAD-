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

    // const jsonData = JSON.parse(testJsonData);
    // const contentEncoded = Buffer.from(jsonData).toString("base64");
    console.log(testJsonData);

    return;
  } catch (error) {
    console.error("データのデプロイに失敗しました:", error);
  }
}
deploy_json();

module.exports.deploy_json = deploy_json;
