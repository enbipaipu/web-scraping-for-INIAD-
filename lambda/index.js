function logValues(x, context) {
  console.log("testが通りました");
  for (const s in x) {
    console.log(s);
  }
}

// logValues関数をエクスポートする
module.exports.logValues = logValues;
