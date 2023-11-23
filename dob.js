/**
 *  Program to calculate DOB
 */
const { differenceInYears } = require("date-fns");

// function findDOBVoid(currentyear, birthyear) {
//   //VOID (wont return )
//   differenceInYears(currentyear, birthyear);
// }

// const myAge = findDOBVoid(new Date("2023-11-23"), new Date("1997-06-20"));
// console.log(myAge);

function findDOBWithReturn(currentyear, birthyear) {
  //VOID (wont return )
  return differenceInYears(currentyear, birthyear);
}

const myNewAge = findDOBWithReturn(
  new Date("2023-11-23"),
  new Date("1997-06-20")
);
console.log(myNewAge);
