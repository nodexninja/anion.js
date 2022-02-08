const { db, render, server, express } = require('./index')

db.auth(process.env['json'])
// db.put('people', 'nodexninja', { name: 'Nodex Ninja' }) // Write to document
db.use('people', 'nodexninja', (item) => {
  console.log(item.data()) // Read document
})

const site = render('public/index.html', {
  css: 'css',
  js: 'js'
}, {
  title: 'Anion',
  root: '../public/'
})

server.use(express.static('anion'))

server.get('/', (req, res) => {
  res.send('Hello World')
})

server.listen(3000)
