const { db, render } = require('./index')

db.env(process.env['json'])
db.secretAuth()
// db.put('people', 'nodexninja', { name: 'Nodex Ninja' }) // Write to document
db.use('people', 'nodexninja', (item) => {
  console.log(item.data()) // Read document
})

const site = render('public/index.html', {
  title: 'Anion',
})

// console.log(site)