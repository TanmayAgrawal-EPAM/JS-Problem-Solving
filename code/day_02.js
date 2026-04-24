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
Q2 - Given an array of integers, find the second largest distinct number in the array.
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
      second = first; //tricky here since we are swapping the first largest to second largest before assigning the max number
      first = num;
    } else if (num > second && num !== first) {
      //this condition is important to make sure that duplicates are not considered
      second = num;
    }
  }
  return second == -Infinity ? null : second;
}
// console.log(secondLargestCorrected(testArr));

//----------------------
//----------------------
//----------------------

/*
Q-3 Given a string, find the length of the longest substring without repeating characters.
Input:  "abcabcbb"
Output: 3   // "abc"
*/

/* idea here is to create a sliding window and keep track of reaccuring elements in the map with their older index. 
so we keep shifting right and check if the char is in hashMap, if not keep growing window
if we found something in hashMap here what we need to do"
- step 1 : move left now - but by how much ( we will find the index of element reaccurring and that will become new left)
- step 2 : Now we make sure that in case of duplicates the left does not move backwards, it should be always forward (so compare it with current left)
= step 3: we need to update the maxLenght which is the max of current max lenght and right-left+1 (exaple "abc".lenght = 3 how ? left is at index a = 0, right is at index c = 2 so length = 2-0 + 1 = 3)
*/
function longestSubstringWithoutRepeating(str) {
  if (!str) return null;
  let map = new Map();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < str.length; right++) {
    if (map.has(str[right])) {
      left = Math.max(map.get(str[right]) + 1, left);
    }
    map.set(str[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}

// console.log(longestSubstringWithoutRepeating("abcdeabcdg"));

//----------------------
//----------------------
//----------------------

/*
Q-4 Given an array, find the maximum sum of any contiguous subarray of size k.
Input: arr = [2, 1, 5, 1, 3, 2], k = 3  
Output: 9   // [5,1,3]
*/

/*
Concept : We are not creating the new window here actually. 
Step 1 : Sum of all k elments of array
Step 2 : Start a new loop to move the window from right and shrink from left, here by shrinking means
removing the element or substracting the value of left so that window always remains k size
step 3 : Simple put it as the max, so here Math.max will compare current max and calculated sum and updates it
*/

function maxSubArray(arr, k) {
  let right = 0;
  let sum = 0;
  let max = -Infinity;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  for (let right = k; right < arr.length; right++) {
    sum += arr[right]; //adding window sum of right
    sum -= arr[right - k]; // since after adding its grater than k lenght so subtracting the value from left
    max = Math.max(max, sum);
  }
  return max;
}
// console.log(maxSubArray([2, 1, 5, 1, 3, 2], 3));

//----------------------
//----------------------
//----------------------

/*
Q-5  Longest Substring with At Most K Distinct Characters
Input: s = "eceba", k = 2  
Output: 3   // "ece"
*/

/*
Points to remember here, We are checking the frequency of the distinct charachters
so here e  means 1 <= 2
ec  means 2 <= 2
ece still means 2 (why? because two unique char only e and c) 2<=2
eceb noe it means 3 which is not less than or equal to distinct element . 
So similarly we need to test this across the length of string and keep the value of the max count of the elements allowed within K
here, in solution we move the right to expand the window and on every iteration we check if the window is valid by checking the size of 
the map against the vlaue of k. If in case it exceeds we will iteratively reduces the values of frequency from map till it reaches valid window

So expand if valid
shrink if invalid (iteratively)
*/

function longestWithK(str, k) {
  if (str.length < k) return;
  let map = new Map();
  let left = 0;
  let max = -Infinity;
  for (let right = 0; right < str.length; right++) {
    map.set(str[right], (map.get(str[right]) || 0) + 1);
    while (map.size > k) {
      map.set(str[left], map.get(str[left]) - 1);
      if (map.get(str[left]) == 0) {
        map.delete(str[left]);
      }
      left++;
    }
    max = Math.max(max, right - left + 1);
  }
  return max;
}
console.log(longestWithK("eceba", 2));
