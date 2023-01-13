const fs = require("fs");
let b=[];
const a ={
    "applicationstatus": 1,
  "createdat": {
    "$date": {
      "$numberLong": "1669536456615"
    }
  },
  "updatedat": {
    "$date": {
      "$numberLong": "1670774430428"
    }
  },
  "formtype": 14,
  "applicationtype": 14,
  "applicationcreateddate": 1669536486537,
  "pancardmeta": {
    "baseformid": "6b27ad17-ed03-43e3-8af7-9589d4a6cc7d",
    "applicationtype": 2,
    "mobilenumber": "98798798",
    "name": "aruljothy",
    "dateofbirth": {
      "$date": {
        "$numberLong": "1667203696473"
      }
    },
    "fathername": "asdasd",
    "aadharnumber": "asdasd",
    "panapplicationid": "e833562d-64c5-4c5a-8ce3-bf94b3358aa5",
    "email": "aruljoth.s8@gmail.com"
  },
  "applicationformid": "dac6ef07-1b15-4c01-99fa-c4750eb77449",
  "updatedby": "Arul Jothy(arul@gmail.com)",
  
  "acknowledgementreferenceid": "880fdf93-a16c-4bcd-8247-1ffc4178bca6",
  "paymentmeta": {
    "amount": 120,
    "updatedby": "Arul Jothy(arul@gmail.com)",
    "referencenumber": "asdasd",
    "updatedat": 1670775471597
  },
  "estimatedcompletiontime": 1670926419859,
  "isapplicationeditable": true,
  "appliedacknowledgementreferenceid": "9fd2b5a0-7f2b-44b3-ba4c-b7f53fb1f8cb"
}
for(let i=0;i<=2000;i++){
  b.push(a)
}
// const c = {
//   port: 8082,
//   kafka: { brokers: ["192.168.0.149:9092"] },
//   logger: { debug: false, connectionstring: "test", type: 3 },
//   dtendpoint: "http://192.168.6.204:5000",
//   yokoapikey:
//     "3U4SGoaPhBmv9b2SHfbPe0pLbAVlg8YJ4sFZrcC0SfbXcFfOhVxcyeBjRniFzx1T3kmBFKRNECzvuqCZGKBS3UEWTj4DbqdaPVqfFgLF2htxdV3psXn6Sx0D17MhOeek3uLN7rPJyJUj2y8Zns7emSZpbZDWV1MAaA2aQsBRY2UvoT02upyDKPykZ58zgDm0yl6rFgU8o95a3VWu87OkB95QgygFQu3agLlWDBbGwnZsiqJ7GqdXt6phvplwqaNt",
//   yokoendpoint: "http://192.168.6.204:8083",
//   radiaticsendpoint: "http://o2power.radiatics.com:3000",
//   radiaticsapikey:
//     "3U4SGoaPhBmv9b2SHfbPe0pLbAVlg8YJ4sFZrcC0SfbXcFfOhVxcyeBjRniFzx1T3kmBFKRNECzvuqCZGKBS3UEWTj4DbqdaPVqfFgLF2htxdV3psXn6Sx0D17MhOeek3uLN7rPJyJUj2y8Zns7emSZpbZDWV1MAaA2aQsBRY2UvoT02upyDKPykZ58zgDm0yl6rFgU8o95a3VWu87OkB95QgygFQu3agLlWDBbGwnZsiqJ7GqdXt6phvplwqaNt",
//   twilio: {
//     accountSid: "SK886699709ea7a9a8273dcc3b77e44b25",
//     authToken: "vwGI4rhAnBB5Li5rhvNJJGXBHVWQhNuF",
//   },
// };
// const b = {
//   port: 8082,
//   kafka: { brokers: ["192.168.0.149:9092"] },
//   logger: { debug: false, connectionstring: "test", type: 3 },
//   dtendpoint: "http://192.168.6.204:5000",
//   yokoapikey:
//     "3U4SGoaPhBmv9b2SHfbPe0pLbAVlg8YJ4sFZrcC0SfbXcFfOhVxcyeBjRniFzx1T3kmBFKRNECzvuqCZGKBS3UEWTj4DbqdaPVqfFgLF2htxdV3psXn6Sx0D17MhOeek3uLN7rPJyJUj2y8Zns7emSZpbZDWV1MAaA2aQsBRY2UvoT02upyDKPykZ58zgDm0yl6rFgU8o95a3VWu87OkB95QgygFQu3agLlWDBbGwnZsiqJ7GqdXt6phvplwqaNt",
//   yokoendpoint: "http://192.168.6.204:8083",
//   radiaticsendpoint: "http://192.168.6.204:8083",
//   radiaticsapikey:
//     "3U4SGoaPhBmv9b2SHfbPe0pLbAVlg8YJ4sFZrcC0SfbXcFfOhVxcyeBjRniFzx1T3kmBFKRNECzvuqCZGKBS3UEWTj4DbqdaPVqfFgLF2htxdV3psXn6Sx0D17MhOeek3uLN7rPJyJUj2y8Zns7emSZpbZDWV1MAaA2aQsBRY2UvoT02upyDKPykZ58zgDm0yl6rFgU8o95a3VWu87OkB95QgygFQu3agLlWDBbGwnZsiqJ7GqdXt6phvplwqaNt",
//   twilio: {
//     accountSid: "SK886699709ea7a9a8273dcc3b77e44b25",
//     authToken: "vwGI4rhAnBB5Li5rhvNJJGXBHVWQhNuF",
//   },
// };
// const a = JSON.stringify(b);
// console.log(a);

// const content = a;

try {
  fs.writeFileSync(`./${new Date().getTime()}.txt`, JSON.stringify(b));
  // file written successfully
} catch (err) {
  console.error(err);
}
