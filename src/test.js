const {
    List,
    Map
} = require('immutable');

let ret = {
    a: List([1,2,3,3])
}
console.log({...ret , ...{a:12}});

let arr = [{a:1},{a:2},{a:3}];
arr.reduce((a,b)=>{
    a.sub = b;
    return b;
});

console.log(JSON.stringify(arr[0],null,1));