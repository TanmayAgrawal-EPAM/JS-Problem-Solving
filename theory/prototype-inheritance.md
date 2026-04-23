# Prototype Inheritance in JavaScript

## Summary
Prototype inheritance is JavaScript's built-in mechanism for sharing behavior between objects.
Instead of classes copying methods into each instance, objects can *delegate* method lookups to another object called their prototype.

In short:
- Every object has an internal prototype link (`[[Prototype]]`)
- Property lookup first checks the object itself
- If not found, lookup continues up the prototype chain
- The chain ends at `Object.prototype`, then `null`

---

## 1) The Core Idea: Delegation, Not Copying
When you access `obj.someMethod`, JavaScript does this:
1. Check if `someMethod` exists directly on `obj`
2. If not, check `obj`'s prototype
3. Keep going up prototypes until found or until `null`

So methods are usually stored once on a shared prototype and reused by many objects.

```js
const animalMethods = {
  speak() {
    console.log(`${this.name} makes a sound`);
  }
};

const dog = Object.create(animalMethods);
dog.name = "Rex";

dog.speak(); // Rex makes a sound
```

`dog` does not own `speak`; it inherits it through the prototype link to `animalMethods`.

---

## 2) How to Inspect Prototypes
Use these tools:
- `Object.getPrototypeOf(obj)` -> read prototype
- `Object.setPrototypeOf(obj, proto)` -> set prototype (avoid in hot paths)
- `obj.hasOwnProperty(key)` -> check if property belongs to object itself

```js
console.log(Object.getPrototypeOf(dog) === animalMethods); // true
console.log(dog.hasOwnProperty("speak")); // false
console.log("speak" in dog); // true (own + inherited)
```

---

## 3) Constructor Functions and `.prototype`
Before `class`, JavaScript used constructor functions.
Every function has a `.prototype` object used for instances created with `new`.

```js
function Person(name) {
  this.name = name; // own property
}

Person.prototype.greet = function () {
  console.log(`Hi, I am ${this.name}`);
};

const p1 = new Person("Tanmay");
const p2 = new Person("Alex");

p1.greet(); // Hi, I am Tanmay
p2.greet(); // Hi, I am Alex
```

`greet` is stored once on `Person.prototype`, shared by all `Person` instances.

---

## 4) `class` Syntax Is Prototype Inheritance Under the Hood
`class` is mostly syntax sugar over prototypes.

```js
class Vehicle {
  move() {
    console.log("Moving...");
  }
}

class Car extends Vehicle {
  honk() {
    console.log("Beep!");
  }
}

const c = new Car();
c.move(); // inherited from Vehicle.prototype
c.honk(); // own class method
```

Even with classes:
- Methods live on `Vehicle.prototype` / `Car.prototype`
- Instances delegate lookups through the prototype chain

---

## 5) Property Shadowing (Overriding at Instance Level)
If an instance defines the same property name as one in its prototype, the own property wins.

```js
const base = { x: 10 };
const obj = Object.create(base);

console.log(obj.x); // 10 (from prototype)
obj.x = 99;
console.log(obj.x); // 99 (own property shadows prototype)
```

This is called shadowing.

---

## 6) Chain Example

```js
const grandParent = { a: 1 };
const parent = Object.create(grandParent);
parent.b = 2;

const child = Object.create(parent);
child.c = 3;

console.log(child.c); // 3 (own)
console.log(child.b); // 2 (parent)
console.log(child.a); // 1 (grandParent)
```

Lookup path is `child -> parent -> grandParent -> Object.prototype -> null`.

---

## 7) Common Mistakes

### A) Confusing `__proto__` with `.prototype`
- `obj.__proto__` (legacy accessor): the object's prototype link
- `fn.prototype`: object used when creating instances via `new fn()`

They are related but not the same thing.

### B) Defining methods inside constructor unnecessarily

```js
function BadUser(name) {
  this.name = name;
  this.sayHi = function () {
    console.log(`Hi ${this.name}`);
  };
}
```

This creates a new function per instance. Prefer prototype methods for shared behavior.

### C) Overusing deep prototype chains
Very deep chains can make code harder to reason about. Keep inheritance simple and intentional.

---

## 8) Practical Rule of Thumb
- Put shared behavior on prototypes (or class methods)
- Put per-instance data on the instance itself
- Favor composition when inheritance becomes complex

---

## 9) Quick Mental Model
Think of an object as:
- A local dictionary of own properties
- Plus a pointer to another object for fallback lookups

That fallback pointer is the prototype link.

---

## 10) Mini Practice
Try this in [basics.js](basics.js):

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a noise`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function () {
  return `${this.name} barks`;
};

const d = new Dog("Rex", "Labrador");
console.log(d.speak());
console.log(Object.getPrototypeOf(d) === Dog.prototype);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
```

What to observe:
- Method overriding (`Dog.prototype.speak`)
- Chain wiring (`Dog.prototype -> Animal.prototype`)
- `constructor` reset after replacing prototype

---

## Next Steps
1. Practice with `Object.create` and manual chain setup.
2. Rewrite the same example using `class`/`extends` and compare behavior.
3. Learn `this` binding deeply, because prototype methods depend on call-site `this`.
