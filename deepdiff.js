

const _ = require('lodash')
var a ={
    companyname: "asdasd",
    website: "asdasd",
    email: "adasd@gmail.com",
    phone: "123",
    salesperson: "Ashish Mahinder",
    address: "asda",
    status: true,
    notes: "asdd",
    currency: "USD",
    duedate: "2022-12-31",
    crmid: "f0e263ca-76a5-4153-9dac-9d95726a0244",
    level: 1,
  }
var b = {
    companyname: "asdasd",
    website: "asdasd",
    email: "adasd@gmail.com",
    phone: "123",
    salesperson: "Ashish Mahinder",
    address: "asda",
    status: true,
    notes: "asdd",
    currency: "USD",
    duedate: "2022-12-31",
    crmid: "f0e263ca-76a5-4153-9dac-9d95726a0244",
    level: 1,
  } 
console.log(_.isEqual(a, b)); // returns false if different