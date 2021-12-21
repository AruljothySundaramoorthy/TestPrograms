var sentence = "my name is Akshatha";

// function reverse(){
// sentence.reverse();
// }
// console.log(sentence);

// ahtahska si eman ym
// ym eman si ahtahska



// const reverserstring = (sentence) => {
//     return sentence.split('').reverse().join('');
// }
// const reverseanother = (sentence) => {
//     return sentence.split(' ').reverse().join(' ');
// }

// console.log(reverseanother(reverserstring(sentence)));
















var sentence = "hi I'm Sangeetha";


var arr = sentence.split(" ");
const string = (s) => {
    return s.split("").reverse().join("");
}

var str = '';
for (let i = 0; i < arr.length; i++) {
    str += " " + string(arr[i]);
}
console.log(str);
