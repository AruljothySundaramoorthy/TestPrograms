function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

console.log(titleCase('ARULJOTHY SUNDARAMOORTHY'));
console.log(titleCase('iNcrEdible hulK'));