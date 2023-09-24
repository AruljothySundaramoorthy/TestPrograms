const {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  add,
  addDays,
} = require("date-fns");

/**
 * 1. format the date into 'yyyy-mm-dd'
 * 2. format the date into 'dd-mm-yyyy'
 * 3. format the Hour from the date value into 'HH:mm'
 * 3. format the Hour and minute from the date value into 'HH:mm:ss'
 */

const dateone = new Date(); //2023-09-24

const dateTow = new Date("2023-08-01");

const addedDate = addDays(dateone, 2);
console.log(addedDate);

// const formattedDateOne = format(dateone, "yyyy-MM-dd");
// console.log(formattedDateOne);

// const formattedDateTwo = format(dateone, "dd-MM-yyyy");
// console.log(formattedDateTwo);

// const formattedDateThree = format(dateone, "dd-MM");
// console.log(formattedDateThree);

// const formattedDateFour = format(dateone, "HH:mm");
// console.log(formattedDateFour);

// const formattedDateFive = format(dateone, "hh:mm");
// console.log(formattedDateFive);

// const formattedDateSix = format(dateone, "hh:mm:ss");
// console.log(formattedDateSix);
