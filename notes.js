const fs = require('fs');

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

console.log(command, title, content);

switch (command) {
  case 'list':
    list();
    break;
  case 'view':
    view();
    break;
  case 'create':
    create();
    break;
  case 'remove':
    remove();
    break;
  default:
    console.log('Неизвестная команда');
    break;
}

function checkFileExists() {
  fs.exists('notes.json', function (exists) {
    if (!exists) {
      fs.open('notes.json', function (err, file) {
        if (err) throw err;
        console.log('created!');
      });
    }
  }); 
}

function list() {
  checkFileExists();
  fs.readFile("notes.json", "utf8", function (error, data) {
    if (error) throw Error;
    const lists = JSON.parse(data);
    console.log(lists);
    for (let item in lists) {
      console.log(lists[item].title);
    }
  });
}