# Define a function to check if a number is odd or even using the binary method
def is_odd_or_even(number):
    # Use bitwise AND operator (&) with 1 to check the LSB (least significant bit)
    # If the LSB is 1, the number is odd; if it's 0, the number is even
    if number & 1:
        return "Odd"
    else:
        return "Even"

# Replace this with the number you want to check
input_number = 42

# Call the is_odd_or_even function to determine if the input number is odd or even
result = is_odd_or_even(input_number)

# Output the result
print(f"{input_number} is {result}")
