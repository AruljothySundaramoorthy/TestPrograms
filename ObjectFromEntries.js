const { userdata } = require("./mockdata/userdata");

const findEmail = "lsimco5@apple.com";

console.time("test_timer_start");
userdata.forEach((x) => {
  //Run a loop for the 1000 data and find the email is there or not (Time complexity is high)
  if (x.email == findEmail) {
    console.log("Found", new Date());
  }
});

console.timeEnd("test_timer_start");

const emaildata = Object.fromEntries(userdata.map((x) => [x.email, x]));

console.time("Entries_test_timer_start");
console.log(emaildata[findEmail] ? true : false);
console.timeEnd("Entries_test_timer_start");
