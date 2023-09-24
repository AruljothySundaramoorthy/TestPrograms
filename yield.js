function* foo(index) {
  while (index < 2) {
    yield `${index}_Arul`;
    index++;
  }
}

const iterator = foo(0);

console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
