// console.log('hello world');
// give error at line 3rd as its interpreted language
// interperated language go line by line
// console.log(a);

setInterval(clock, 1000);

function clock() {
  const date = new Date();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  console.log(`${hh}:${mm}:${ss}`);
}
