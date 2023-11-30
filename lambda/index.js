function logValues(obj) {
  Object.values(obj).forEach((value) => {
    console.log(value);
  });
}

// logValues関数をエクスポートする
module.exports.logValues = logValues;
