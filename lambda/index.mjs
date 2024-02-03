import { get_json } from "./get_json.mjs";
import { update_json } from "./update_json.mjs";
import { deploy_json } from "./deploy_json.mjs";

export async function main() {
  console.log("mainを実行します");
  const JsonData = await get_json(); //jsonから保存済みのURLの情報を取得する関数。
  const UpdateJson = await update_json(JsonData); //infoにないURLをmoocsから取得する関数

  await deploy_json(UpdateJson[0], UpdateJson[1]); //new_infoをjsonにデプロイする関数。
  console.log("mainを終了します");
}

main();
