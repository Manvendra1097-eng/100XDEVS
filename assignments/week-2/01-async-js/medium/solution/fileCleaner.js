let str = 'hello     world    my    name   is       raman';

console.log(str);

str = str
  .split(' ')
  .filter((data) => data.length > 0)
  .join(' ');
console.log(str);
