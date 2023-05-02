var format = require("string-template");

// Format using an object hash with keys matching [0-9a-zA-Z]+
let j={
    a:'Arul'
}
    const greeting = format("Hello {name}, you have {count} unread messages", {
    name:j.a,
    count: 12,
    });
console.log(greeting);
