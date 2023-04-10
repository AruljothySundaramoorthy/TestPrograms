var parser = require("cron-parser");

var options = {
  currentDate: new Date("2022-10-10"),
  endDate: new Date("2023-10-10"),
  iterator: true,
};

try {
  var interval = parser.parseExpression("0 0 * * 0", options);
  let tempdata = [];

  while (true) {
    try {
      var obj = interval.next();

      tempdata.push(new Date(obj.value).getTime());
    } catch (e) {
      break;
    }
  }
  console.log(tempdata);
  tempdata.map((x) => console.log(new Date(x)));
} catch (err) {
  console.log("Error: " + err.message);
}
