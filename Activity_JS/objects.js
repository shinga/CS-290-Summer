// Your code here.
function deepEqual(o1, o2) {
   for(var prop in o1) {
      if(typeof prop == "object" && prop != null) {
         deepEqual(o1[prop], o2[prop]);

      }
   }
   return o1 === o2;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
