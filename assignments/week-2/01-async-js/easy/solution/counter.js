// setInterval(function () {
//   const date = new Date();
//   const hh = date.getHours();
//   const mm = date.getMinutes();
//   const ss = date.getSeconds();
//   console.log(`${hh}:${mm}:${ss}`);
// }, 1000);

function counter() {
  setTimeout(function () {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    console.log(`${hh}:${mm}:${ss}`);
    counter();
  }, 1000);
}

counter();
