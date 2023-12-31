// function add(num) {
//     num.toUpperCase() -> no error
//     return num + 2;
//   }
function add(num) {
    return num + 2;
}
// add("5") -> error
add(5);
function getUpper(val) {
    return val.toUpperCase();
}
// getUpper(4); -> error
getUpper('4');
// function signUp(name,email,password){ -> marked as any not good
// }
function signUp(name, email, password) { }
// pass default value
var login = function (email, password, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
};
login('m', 'man@gmail.com');
// <---------------------------------------------------------> //
// how to return more acturate value
function newAdd(num) {
    return num + 2;
}
// need to retun two type of value
function getValue(val) {
    if (val > 5) {
        return true;
    }
    return '200 OK';
}
var heros = ['Thor', 'Spiderman'];
heros.map(function (h) { return "hero is ".concat(h); });
function consoleError(errmsg) {
    console.log(errmsg);
}
function handleError(errmsg) {
    throw new Error(errmsg);
}
