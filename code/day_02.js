/*
Q1 - Longst uniform string . 
Input:  "aaabbccccd"
Output: 4   // "cccc"
*/

let testStr = "aaabbccccd";
function longestUniformString(str) {
  let max = 0;
  let i = 0;
  while (i < str.length) {
    let char = str[i];
    let uni = "";
    while (char == str[i]) {
      uni += str[i];
      i++;
    }
    max = Math.max(max, uni.length);
  }
  return max;
}
// console.log(longestUniformString(testStr));

//----------------------
//----------------------
//----------------------

/*
Given an array of integers, find the second largest distinct number in the array.
If it does not exist, return null.
Input:  [10, 5, 8, 20]
Output: 10
*/

let testArr = [-10, 5, 0, -20];
// function secondLargest(arr) {
//   if (!arr.length) return null;
//   if (arr.length < 1) return arr[0];
//   let first = arr[0];
//   let second = arr[1];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] >= first && arr[i] > second) {
//       first = arr[i];
//     }
//   }
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < first && arr[i] >= second) {
//       second = arr[i];
//     }
//   }
//   return second;
// }
function secondLargestCorrected(arr) {
  if (arr.lengh < 2) return null;
  let first = -Infinity;
  let second = -Infinity;
  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second == -Infinity ? null : second;
}
console.log(secondLargestCorrected(testArr));

//----------------------
//----------------------
//----------------------
