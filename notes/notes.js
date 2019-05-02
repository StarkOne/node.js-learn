const fs = require('fs')

const command = process.argv[2]
const title = process.argv[3]
const content = process.argv[4]

switch (command) {
  case 'list':
    list((error, notes) => {
      if (error) return console.error(error.message)
      notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title}`)
      })
    })
    break
  case 'view':
    view(title, (error, note) => {
      if (error) return console.error(error.message)
      console.log(`# ${note.title}\r\n\r\n---\r\n\r\n${note.content}`)
    })
    break
  case 'create':
    create(title, content, error => {
      if (error) return console.error(error.message)
      console.log('Заметка создана')
    })
    break
  case 'remove':
    remove(title, error => {
      if (error) return console.error(error.message)
      console.log('Заметка удалена')
    })
    break
  default:
    console.log('Неизвестная команда')
    break
}

function checkFileExists() {
  fs.exists('notes.json', function(exists) {
    if (!exists) {
      fs.open('notes.json', function(err, file) {
        if (err) throw err
        console.log('created!')
      })
    }
  })
}

function load(done) {
  fs.readFile('notes.json', 'utf8', function(error, data) {
    if (error) {
      if (error.code === 'ENOENT') {
        return done(null, [])
      } else {
        return done(error)
      }
    }
    try {
      const notes = JSON.parse(data)
      done(null, notes)
    } catch (error) {
      done(new Error('Не удалось преобразовать данные.'))
    }
  })
}

function save(notes, done) {
  try {
    const json = JSON.stringify(notes)
    fs.writeFile('notes.json', json, error => {
      if (error) return done(error)
      done()
    })
  } catch (error) {
    done(error)
  }
}

function list(done) {
  checkFileExists()
  load(done)
}

function view(title, done) {
  checkFileExists()
  load((error, notes) => {
    if (error) return done(error)
    const note = notes.find(note => {
      return note.title == title
    })
    if (!note) {
      return done(new Error('Заметка не найдена'))
    }
    done(null, note)
  })
}

function create(title, content, done) {
  checkFileExists()
  load((error, notes) => {
    if (error) return done(error)
    notes.push({ title, content })
    save(notes, done)
  })
}

function remove(title, done) {
  checkFileExists()
  load((error, notes) => {
    if (error) return done(error)
    notes = notes.filter(note => note.title !== title)
    save(notes, done)
  })
}
