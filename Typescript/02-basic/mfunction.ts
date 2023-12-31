// function add(num) {
//     num.toUpperCase() -> no error
//     return num + 2;
//   }

function add(num: number) {
  return num + 2;
}

// add("5") -> error
add(5);

function getUpper(val: string) {
  return val.toUpperCase();
}
// getUpper(4); -> error
getUpper('4');

// function signUp(name,email,password){ -> marked as any not good

// }

function signUp(name: string, email: string, password: string) {}

// pass default value
const login = (email: string, password: string, isPaid: boolean = false) => {};

login('m', 'man@gmail.com');

// <---------------------------------------------------------> //
// how to return more acturate value

function newAdd(num: number): number {
  return num + 2;
}

// need to retun two type of value
function getValue(val: number): string | boolean {
  if (val > 5) {
    return true;
  }
  return '200 OK';
}

const heros = ['Thor', 'Spiderman'];

heros.map((h): string => `hero is ${h}`);

function consoleError(errmsg: string): void {
  console.log(errmsg);
}

function handleError(errmsg: string): never {
  throw new Error(errmsg);
}
