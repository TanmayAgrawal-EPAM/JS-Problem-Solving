/*
console.log( transform('aaabbbaa') ); // => 'a3b3a2'
*/

function transform(str) {
  if (!str.length) return null;
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let count = 1;
    let char = str[i];
    while (str[i + 1] == char && str[i + 1]) {
      i++;
      count++;
    }
    result += char + String(count);
  }
  return result;
}

// console.log(transform("aaabbcccc"));
//---------------
//---------------
//---------------
//---------------
const input = [
  { key: "A", score: 10 },
  { key: "B", score: 20 },
  { key: "A", score: 30 },
  { key: "C", score: 40 },
  { key: "B", score: 50 },
];

merged = input.reduce((acc, curr) => {
  let { key, score } = curr;
  acc[key] = (acc[key] || 0) + score;
  return acc;
}, {});
// console.log(merged);

//but in case I have to make it in form of an Array now, like array of object {key, score}

let transformArray = Array.from(Object.entries(merged), ([key, score]) => ({
  key,
  score,
}));
// console.log(transformArray);
//Testing this functionality-------------
// console.log(Object.entries(merged));
//So Object.entries(merged) gives us an array of arrays,
//  where each inner array contains a key and its
// corresponding value from the merged object.
//  Then, we use Array.from to transform this array of arrays
//  into an array of objects with the desired structure {key, score}.

//---------------
//---------------
//---------------
//---------------

// Code 6 - Return start and end index of longest uniform substring

// "aabbbbbbaccccccc" -> [9,15]
// "abbbccda" -> [1, 3]
// "10000111" ->> [ 1, 4 ]
// "aabbbbCdAA" => [ 2, 5 ]

function returnLongestUniform(str) {
  if (!str.length) return [];
  let left = 0;
  let max = -Infinity;
  let result = [0, 0];
  for (let right = 0; right < str.length; right++) {
    let char = str[right];
    while (str[left] == str[right]) {
      right++;
    }
    if (result[1] - result[0] < right - left) {
      result[0] = left;
      result[1] = right - 1;
    }
    left = right;
  }
  return result;
}
// console.log(returnLongestUniform("10000111"));

//---------------
//---------------
//---------------
//---------------

/*
 Given a list of student test scores, find the best average grade.

const people = [
  [ "Bobby", "87" ],
  [ "Charles", "100" ],
  [ "Eric", "64" ],
  [ "Charles", "22" ]
]
 Expected output: 87

const people2 = [
  ["jerry","65"],
  ["bob","91"], 
  ["jerry","23"],
  ["Eric","83"]
]
 91
*/
