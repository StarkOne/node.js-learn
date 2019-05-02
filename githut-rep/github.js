const https = require('https')

function getRepos(userName, done) {
  if (!userName) {
    return done(new Error('Необходимо указать имя пользователя'))
  }
  const option = {
    hostname: 'api.github.com',
    path: `/users/${userName}/repos`,
    headers: {
      'User-Agent': userName,
    },
  }
  const req = https.get(option, res => {
    res.setEncoding('utf-8')
    if (res.statusCode === 200) {
      let body = ''
      res.on('data', data => {
        body += data
      })

      res.on('end', () => {
        try {
          const result = JSON.parse(body)
          done(null, result)
        } catch (error) {
          done(new Error(`Не удалось обработать данные ${error.message}`))
        }
      })
    } else {
      done(
        new Error(
          `Не удалось получить данные от сервера ${res.statusCode} ${
            res.statusMessage
          }`
        )
      )
    }
  })

  req.on('error', error =>
    done(new Error(`Не удалось отправить запрос ${error.message}`))
  )
}

module.exports = {
  getRepos,
}
