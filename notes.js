const fs = require('fs');

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

console.log(command, title, content);

switch (command) {
  case 'list':
    list((error, notes) => {
      if (error) return console.error(error.message);
      notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title}`);
      });
    });
    break;
  case 'view':
    view(title, (error, note) => {
      if (error) return console.error(error.message);
      console.log(`# ${note.title}\r\n\r\n---\r\n\r\n${note.content}`)
    });
    break;
  case 'create':
    create(title, content, error => {
      if (error) return console.error(error.message);
      console.log('Заметка создана');
    });
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

function view(title, done) {
  checkFileExists();
  fs.readFile("notes.json", "utf8", function (error, data) {
    if (error) return done(error);
    const notes = JSON.parse(data);
    const note = notes.find(note => {
      return note.title = title
    })
    if (!note) {
      return done(new Error('Заметка не найдена'))
    }
    done(null, note);
  });
}

function create(title, content, done) {
  checkFileExists();
  fs.readFile("notes.json", "utf8", function (error, data) {
    if (error) return done(error);
    const notes = JSON.parse(data);
    notes.push({title, content});
    const json = JSON.stringify(notes);
    fs.writeFile('notes.json', json, error => {
      if (error) return done(error);

      done();
    })
  });
}