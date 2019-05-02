const http = require('http')
const fs = require('fs')
const path = require('path')
const render = require('./lib/render')

const { public, home, search, notFound } = require('./routes')

http.ServerResponse.prototype.render = render

http
  .createServer((req, res) => {
    if (req.url.match(/\.(html|css|js|png)$/)) {
      public(req, res)
    } else if (req.url === '/') {
      home(req, res)
    } else if (req.url.startsWith('/search')) {
      search(req, res)
    } else {
      notFound(req, res)
    }
  })
  .listen(3000, () => {
    console.log('Сервер запущен!')
  })
