function logValues(x) {
  console.log("testを開始します。");
  let value = ["a", "b", "c"];
  if (x) {
    value = x;
  }
  for (const s in value) {
    console.log(s);
  }
}

// logValues関数をエクスポートする
module.exports.logValues = logValues;
