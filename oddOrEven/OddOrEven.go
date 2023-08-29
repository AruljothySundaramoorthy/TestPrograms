package main

import "fmt"

// Define a function to check if a number is odd or even using the binary method
func isOddOrEven(number int) string {
	// Use bitwise AND operator (&) with 1 to check the LSB (least significant bit)
	// If the LSB is 1, the number is odd; if it's 0, the number is even
	if number&1 == 1 {
		return "Odd"
	}
	return "Even"
}

func main() {
	// Replace this with the number you want to check
	inputNumber := 42

	// Call the isOddOrEven function to determine if the input number is odd or even
	result := isOddOrEven(inputNumber)

	// Output the result
	fmt.Printf("%d is %s\n", inputNumber, result)
}
