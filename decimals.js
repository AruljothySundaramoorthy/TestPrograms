function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }
  
  console.log(addLeadingZeros(3, 2)); // 👉️ "03"
  console.log(addLeadingZeros(3, 3)); // 👉️ "003"
  console.log(addLeadingZeros(3, 4)); // 👉️ "0003"
  console.log(addLeadingZeros(100, 2)); // 👉️ "100"
  
  // 👇️ Alternatively, simply use the Addition (+) operator
  const num = '00' + 3;
  console.log(typeof(num),num+4); // 👉️ "003"