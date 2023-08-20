const fs = require("fs");
let b = [];
const a = {
  applicationstatus: 1,
  createdat: {
    $date: {
      $numberLong: "1669536456615",
    },
  },
  updatedat: {
    $date: {
      $numberLong: "1670774430428",
    },
  },
  formtype: 14,
  applicationtype: 14,
  applicationcreateddate: 1669536486537,
  pancardmeta: {
    baseformid: "6b27ad17-ed03-43e3-8af7-9589d4a6cc7d",
    applicationtype: 2,
    mobilenumber: "98798798",
    name: "aruljothy",
    dateofbirth: {
      $date: {
        $numberLong: "1667203696473",
      },
    },
    fathername: "asdasd",
    aadharnumber: "asdasd",
    panapplicationid: "e833562d-64c5-4c5a-8ce3-bf94b3358aa5",
    email: "aruljoth.s8@gmail.com",
  },
  applicationformid: "dac6ef07-1b15-4c01-99fa-c4750eb77449",
  updatedby: "Arul Jothy(arul@gmail.com)",

  acknowledgementreferenceid: "880fdf93-a16c-4bcd-8247-1ffc4178bca6",
  paymentmeta: {
    amount: 120,
    updatedby: "Arul Jothy(arul@gmail.com)",
    referencenumber: "asdasd",
    updatedat: 1670775471597,
  },
  estimatedcompletiontime: 1670926419859,
  isapplicationeditable: true,
  appliedacknowledgementreferenceid: "9fd2b5a0-7f2b-44b3-ba4c-b7f53fb1f8cb",
};
for (let i = 0; i <= 2000; i++) {
  b.push(a);
}

try {
  fs.writeFileSync(`./${new Date().getTime()}.txt`, JSON.stringify(b));
  // file written successfully
} catch (err) {
  console.error(err);
}
