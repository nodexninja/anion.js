const db = require('./database')
const Mustache = require('mustache')
const fs = db.fs

module.exports = {
  db: db,
  render: (html, data) => {
    const file = fs.readFileSync(html, 'utf8')
    Mustache.render(file, data)
  }
}