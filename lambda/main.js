const { deploy_json } = require("./deploy_json");
const { get_json } = require("./get_json");
const { update_json } = require("./update_json");

function main() {
  console.log("mainを実行します");
  get_json(); //jsonから保存済みのURLの情報を取得する関数。
  update_json(); //infoにないURLをmoocsから取得する関数
  deploy_json(); //new_infoをjsonにデプロイする関数。
  console.log("mainを終了します");
}

main();

module.exports.main = main;
// module.exports.logValues = logValues;
