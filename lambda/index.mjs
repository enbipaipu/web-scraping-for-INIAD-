import { get_json } from "./get_json.mjs";
import { update_json } from "./update_json.mjs";
import { deploy_json } from "./deploy_json.mjs";

export async function main() {
  console.log("mainを実行します");

  const CurrentData = await get_json();

  const UpdateExecutionData = await update_json(CurrentData);

  const NewData = UpdateExecutionData[0];
  const isFinishUpdate = UpdateExecutionData[1];

  await deploy_json(NewData, isFinishUpdate); //new_infoをjsonにデプロイする関数。
  console.log("mainを終了します");
}

main();
