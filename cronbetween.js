const cronParser = require("cron-parser");
const moment = require("moment");
// Define the cron pattern
const cronPattern = "*/5 * * * *";

// Define the start and end dates
const startDate = moment("2022-01-01", "YYYY-MM-DD");
const endDate = moment("2022-02-01", "YYYY-MM-DD");

// Calculate the occurrences between the start and end dates
const occurrences = [];
const interval = cronParser.parseExpression(cronPattern);
let occurrence = moment(interval.next().toString());

while (occurrence.isBetween(startDate, endDate, null, "[]")) {
  occurrences.push(occurrence.format("YYYY-MM-DD HH:mm:ss"));
  occurrence = moment(interval.next().toString());
}

console.log(occurrences);
