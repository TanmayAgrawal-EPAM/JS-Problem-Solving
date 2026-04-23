# JavaScript Polyfills Guide

## What You Will Learn
By the end of this guide, you will be able to:
- Explain what a polyfill is and when to use one.
- Write safe, production-style polyfills using feature detection.
- Build different polyfills for arrays, functions, objects, and promises.
- Avoid common mistakes that break older environments.

## Quick Bridge From What You Already Know
You already know JavaScript has built-in methods like `map`, `bind`, and `Promise.all`.
A polyfill is just a fallback implementation for environments where a built-in does not exist.

Think of it like this:
- Native feature exists -> use it.
- Native feature missing -> define it once in a safe way.

---

## 1) What Is a Polyfill?
A polyfill is JavaScript code that adds modern behavior to older runtimes.

Example idea:
- If `Array.prototype.map` is missing, define it.
- If it exists, do nothing.

This pattern is called feature detection.

```js
if (!Array.prototype.map) {
  // define fallback
}
```

## Important Limits
Polyfills are best for APIs and methods.
They cannot fully polyfill language syntax like `class` or `import` in old engines by themselves. For syntax support, tools like Babel are used.

---

## 2) Polyfill Pattern You Should Reuse
Use this baseline pattern:

```js
(function () {
  if (/* feature exists */) return;

  Object.defineProperty(TargetObject, "methodName", {
    value: function () {
      // fallback logic
    },
    writable: true,
    configurable: true
  });
})();
```

Why this style:
- Avoids global leaks with an IIFE.
- Uses `Object.defineProperty` so the method is non-enumerable by default (closer to native behavior).
- Prevents overriding native implementation.

---

## 3) Polyfill Example: Array.prototype.map

```js
(function () {
  if (Array.prototype.map) return;

  Object.defineProperty(Array.prototype, "map", {
    value: function (callback, thisArg) {
      if (this == null) {
        throw new TypeError("Array.prototype.map called on null or undefined");
      }

      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }

      var O = Object(this);
      var len = O.length >>> 0;
      var A = new Array(len);

      for (var k = 0; k < len; k++) {
        if (k in O) {
          A[k] = callback.call(thisArg, O[k], k, O);
        }
      }

      return A;
    },
    writable: true,
    configurable: true
  });
})();
```

### Checkpoint
- Handles sparse arrays.
- Preserves index and original array parameters.
- Throws for invalid callback.

---

## 4) Polyfill Example: Array.prototype.filter

```js
(function () {
  if (Array.prototype.filter) return;

  Object.defineProperty(Array.prototype, "filter", {
    value: function (callback, thisArg) {
      if (this == null) {
        throw new TypeError("Array.prototype.filter called on null or undefined");
      }

      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }

      var O = Object(this);
      var len = O.length >>> 0;
      var res = [];

      for (var k = 0; k < len; k++) {
        if (k in O) {
          var value = O[k];
          if (callback.call(thisArg, value, k, O)) {
            res.push(value);
          }
        }
      }

      return res;
    },
    writable: true,
    configurable: true
  });
})();
```

---

## 5) Polyfill Example: Function.prototype.bind

```js
(function () {
  if (Function.prototype.bind) return;

  Object.defineProperty(Function.prototype, "bind", {
    value: function (thisArg) {
      if (typeof this !== "function") {
        throw new TypeError("bind must be called on a function");
      }

      var targetFn = this;
      var preArgs = Array.prototype.slice.call(arguments, 1);

      var boundFn = function () {
        var callArgs = Array.prototype.slice.call(arguments);
        return targetFn.apply(thisArg, preArgs.concat(callArgs));
      };

      return boundFn;
    },
    writable: true,
    configurable: true
  });
})();
```

Note: This is a practical version. A spec-perfect `bind` polyfill is more complex, especially with constructor behavior (`new boundFn()`).

---

## 6) Polyfill Example: Object.assign

```js
(function () {
  if (typeof Object.assign === "function") return;

  Object.defineProperty(Object, "assign", {
    value: function (target) {
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource != null) {
          for (var key in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
              to[key] = nextSource[key];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
})();
```

---

## 7) Polyfill Example: Promise.all (Minimal Educational Version)

```js
(function () {
  if (typeof Promise === "undefined" || Promise.all) return;

  Object.defineProperty(Promise, "all", {
    value: function (iterable) {
      return new Promise(function (resolve, reject) {
        if (!Array.isArray(iterable)) {
          return reject(new TypeError("Promise.all expects an array in this polyfill"));
        }

        var results = [];
        var remaining = iterable.length;

        if (remaining === 0) {
          return resolve([]);
        }

        iterable.forEach(function (item, index) {
          Promise.resolve(item)
            .then(function (value) {
              results[index] = value;
              remaining -= 1;
              if (remaining === 0) {
                resolve(results);
              }
            })
            .catch(reject);
        });
      });
    },
    writable: true,
    configurable: true
  });
})();
```

Note: Full spec support includes generic iterables and nuanced edge cases.

---

## 8) Common Mistakes and Debugging

### Mistake 1: Overwriting existing native methods
Always guard with feature detection first.

### Mistake 2: Making methods enumerable
If you assign directly, methods can appear in `for...in` loops.
Prefer `Object.defineProperty`.

### Mistake 3: Forgetting `this == null` checks
Many built-ins throw when called on `null` or `undefined`.

### Mistake 4: Ignoring sparse arrays
Methods like `map` and `filter` should skip empty slots.

### Fast Debug Checklist
- Is the guard condition correct?
- Does callback type validation exist?
- Are edge cases handled: empty array, sparse array, null target?
- Does behavior match a modern browser test run?

---

## 9) When To Use Polyfills vs Alternatives
Use polyfills when:
- You need old browser or runtime support for missing APIs.
- You want consistent behavior across environments.

Use transpilers when:
- You need syntax transformation (`?.`, `class`, `import`, etc.).

Use ponyfills when:
- You want standalone helper functions without touching globals.

---

## Retrieval Questions
1. Why is feature detection required before defining a polyfill?
2. Why is `Object.defineProperty` preferred over direct assignment for polyfills?
3. What is one limitation of polyfills compared to transpilers?

## Practice Tasks
1. Write a polyfill for `Array.prototype.find` and test with missing and present values.
2. Improve the `bind` polyfill to better handle constructor usage.
3. Create a small test file that compares native and polyfill outputs for `map`, `filter`, and `assign`.

## Recap
Polyfills let you add missing API behavior safely in older environments.
The key is not just writing fallback logic, but matching native behavior as closely as practical: feature detection, proper errors, and edge-case handling.
