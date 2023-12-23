function singhFn(value) {
  return new Promise(function (resolve) {
    resolve(value);
  });
}

// async function main() {
//   console.log(singhFn('Hi'));
//   singhFn('Hi JS').then(function (value) {
//     console.log('VAlue', value);
//   });
// }

async function main() {
  const res = await singhFn('Hi there');
  console.log(res);
}

main();

console.log('after main');
