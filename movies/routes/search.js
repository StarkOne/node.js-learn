const url = require('url')

const omdb = require('../lib/omdb/omdb')

function search(req, res) {
  const parseUrl = url.parse(req.url, true)
  const { title } = parseUrl.query
  omdb.get(title, (error, movie) => {
    if (error) {
      return res.render('error.html', { error: error.message })
    }
    res.render('movie.html', movie)
  })
}

module.exports = search
