const { get_json } = require("./get_json");

function logValues(x) {
  console.log("testを開始します。");

  let value = ["a", "b", "c"];
  if (x.length > 0) {
    value.splice(0);
    value = x;
  }
  value.forEach((val) => {
    console.log(val);
  });
}
async function main() {
  console.log("mainを実行します");
  const json = await get_json(); //jsonから保存済みのURLの情報を取得する関数。
  console.log("return_json : ", json);
  // let new_info = await get_update_info(); //infoにないURLをmoocsから取得する関数。
  // await deploy_json(); //new_infoをjsonにデプロイする関数。
}
main();
// logValues関数をエクスポートする
module.exports.logValues = logValues;
