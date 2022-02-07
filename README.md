# Anion
Anion is a Full-Stack Web Development Node.js framework that utilises [Firebase](https://firebase.google.com) to create a website with backend features. Anion is a [Replit](https://repl.it) friendly framework for developers who want to use it online!

Made by [nodexninja](https://github.com/nodexninja) for everyone!

## Installation
`npm install anion.js`

## Quick Start
```js
const { db, render } = require('anion.js')

db.env(process.env['json'])
db.auth()
db.put('people', 'nodexninja', { name: 'Nodex Ninja' }) // Write to document
db.use('people', 'nodexninja', (item) => {
  console.log(item.data()) // Read document
})
})
```