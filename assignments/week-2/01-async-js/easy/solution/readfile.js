const fs = require('fs');

fs.readFile('../3-read-from-file.md', 'utf-8', function (err, data) {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log(data);
  }
});
