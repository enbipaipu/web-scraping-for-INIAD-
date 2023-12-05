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
logValues([100, 200, 300]);

// logValues関数をエクスポートする
module.exports.logValues = logValues;
