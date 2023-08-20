class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}!`);
  }

  getAge() {
    return this.age;
  }

  setAge(newAge) {
    this.age = newAge;
  }
}

// Creating instances of the Person class
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

// Accessing properties and invoking methods
console.log(person1.name); // Output: Alice
person2.sayHello(); // Output: Hello, my name is Bob!
console.log(person1.getAge()); // Output: 25
person1.setAge(26);
console.log(person1.getAge()); // Output: 26
