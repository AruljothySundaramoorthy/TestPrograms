removevoweldigit = function (str) {
    var vowels = 'aeiou';
    var result = '';
    for (var i = 0; i < str.length; i++) {
        console.log(str.length);
        console.log(str[i]);
        var ch = str.charAt(i).toLowerCase();
        if (vowels.indexOf(ch) == -1) {
            result += str.charAt(i);
        }
    }
    return result;
}

a = removevoweldigit('Is there any worst creature in earth?');
console.log(a);