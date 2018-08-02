const {
    List,
    Map
} = require('immutable');

let ret = {
    a: List([1,2,3,3])
}
console.log({...ret , ...{a:12}});