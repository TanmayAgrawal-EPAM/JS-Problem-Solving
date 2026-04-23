// Q1--------------------------------------------------------

let obj = [ {name:'abc', score:20}, {name:'pqr', score:30},
 
{name:'abc', score:40}, {name:'pqr', score:50}];

[{name:'abc', score:60}, {name:'pqr', score:30}]

function collectNames(data){
    let map = new Map()
    for(let items of data){
            if(map.has(items.name)){
                map.set(items.name, map.get(items.name)+items.score)
            }else{
                map.set(items.name, items.score)
            }

    }
    return Array.from(map, ([name, score])=>({name,score}))
}

console.log(collectNames(obj))



//Same function but lets try with reduce

//1. Using hash Map and reduce
const resultMap = Array.from(
  obj.reduce((map, { name, score }) => 
    map.set(name, (map.get(name) || 0) + score), 
  new Map()),
  ([name, score]) => ({ name, score })
);

// console.log("Map base result",resultMap)

//2. using pure objects
const resultObj = Object.entries(
  obj.reduce((acc, { name, score }) => {
    acc[name] = (acc[name] || 0) + score;
    return acc;
  }, {})
).map(([name, score]) => ({ name, score }));
// console.log("Obj based result", resultObj)

//--------------------------------------------------------------
//--------------------------------------------------------------
//--------------------------------------------------------------

//Q2----------------------

//Flatten this array : const arr = [[1,[2,3,3],[3],[4,6],[9]],[[2,3,4]]];

//1 . using inbuilt flat method:
let myarr =  [[1,5,[2,3,3],[3],[4,6],[9]],[[2,3,4]]];
flattenMyArr = myarr.flat(Infinity)
console.log(flattenMyArr)

//2. Using without any inbuilt method -- recursion

function recursiveFlat(arr){
    let result = []
    function flatten(arr){
        for(let item of arr){
            if(Array.isArray(item)){
                flatten(item)
            }
            else {
                result.push(item)
            }
        }
    }
    flatten(arr)
    return result
}
// console.log(recursiveFlat(myarr))

//3. Finding max element from the nested Array 

// 1 - using inbuilt method one liners

const maxElement = Math.max(...myarr.flat(Infinity))
console.log("max element", maxElement)

// 2 - using the non inbuilt but recursive method

function findMaxElement(arr){
    max = -Infinity;
    function flatten(arr){
        for(let item of arr){
            if(Array.isArray(item)){
                flatten(item)
            }else{
                max = Math.max(max, item)
            }
        }
    }
    flatten(arr)
    return max
}
console.log(findMaxElement(myarr))
