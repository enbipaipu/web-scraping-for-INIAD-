const { get_json } = require("./get_json");

async function main() {
  console.log("mainを実行します");
  const json = await get_json(); //jsonから保存済みのURLの情報を取得する関数。

  console.log("return_json : ", json);
  let new_info = await get_update_info(); //infoにないURLをmoocsから取得する関数
  // await deploy_json(); //new_infoをjsonにデプロイする関数。
}
main();

module.exports.main = main;
// module.exports.logValues = logValues;
