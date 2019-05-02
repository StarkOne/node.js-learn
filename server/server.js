const http = require('http')

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    })
    res.end(`
    <!doctype>
    <html>
      <head>
        <mete charset="utf-8">
        <title>Основый Node.js</title>
      </head>
      <body>
        <h1>Основый Node.js</h1>
      </body>
    </html>
  `)
  })
  .listen(5000, () => {
    console.log('Сервер работает')
  })
