const fs = require('fs');

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

console.log(command, title, content);

switch (command) {
  case 'list':
    list((error, notes) => {
      if (error) console.console.error(error.message);
      notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title}`);
      });
    });
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

function list(done) {
  checkFileExists();
  fs.readFile("notes.json", "utf8", function (error, data) {
    if (error) return done(error);
    const notes = JSON.parse(data);
    done(null, notes);
  });



}