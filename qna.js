const longWord = (inputString) => {
    var word =inputString?  inputString.split(' ').reduce((longerString, currentString) => {
      return currentString.length > longerString.length ? currentString : longerString;
    }, ' '):'Invalid Input';
    return word;
  };
  console.log(longWord(""));