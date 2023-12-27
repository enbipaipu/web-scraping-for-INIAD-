const { deploy_json } = require("./deploy_json");
const { get_json } = require("./get_json");
const { get_update_info } = require("./get_update_info");

async function main() {
  console.log("mainを実行します");
  await get_json(); //jsonから保存済みのURLの情報を取得する関数。
  await get_update_info(); //infoにないURLをmoocsから取得する関数
  await deploy_json(); //new_infoをjsonにデプロイする関数。
  await console.log("mainを終了します");
}
main();

module.exports.main = main;
// module.exports.logValues = logValues;
