/**
 * Program to find odd or even using bitwise
 * Program to find odd or even without using modulo or division method
 *
 */

// Define a function to check if a number is odd or even using the binary method
function isOddOrEven(number) {
  // Use bitwise AND operator (&) with 1 to check the LSB (least significant bit)
  // If the LSB is 1, the number is odd; if it's 0, the number is even
  if (number & 1) {
    return "Odd";
  } else {
    return "Even";
  }
}

// Replace this with the number you want to check
const inputNumber = 42;

// Call the isOddOrEven function to determine if the input number is odd or even
const result = isOddOrEven(inputNumber);

// Output the result
console.log(`${inputNumber} is ${result}`);
