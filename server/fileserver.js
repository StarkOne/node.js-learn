const http = require('http')
const fs = require('fs')
const path = require('path')

function handleError(error, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain; charset=utf-8',
  })
  res.end(error.message)
}

http
  .createServer((req, res) => {
    if (req.url === '/') {
      const stream = fs.createReadStream(
        path.join(__dirname, 'public', 'index.html')
      )
      stream.on('error', error => handleError(error, res))
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      stream.pipe(res)
    } else if (req.url.match(/.css$/)) {
      const stream = fs.createReadStream(
        path.join(__dirname, 'public', req.url)
      )
      stream.on('error', error => handleError(error, res))
      res.writeHead(200, {
        'Content-Type': 'text/css; charset=utf-8',
      })
      stream.pipe(res)
    } else if (req.url.match(/.(png|jpg)$/)) {
      const stream = fs.createReadStream(
        path.join(__dirname, 'public', req.url)
      )
      stream.on('error', error => handleError(error, res))
      res.writeHead(200, {
        'Content-Type': 'image/png',
      })
      stream.pipe(res)
    } else if (req.url.match(/.js$/)) {
      const stream = fs.createReadStream(
        path.join(__dirname, 'public', req.url)
      )
      stream.on('error', error => handleError(error, res))
      res.writeHead(200, {
        'Content-Type': 'text/javascript; charset=utf-8',
      })
      stream.pipe(res)
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      res.end('404! Не найдено')
    }
  })
  .listen(3000, () => {
    console.log('Сервер работает')
  })
