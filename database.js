const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const fs = require('fs')

module.exports = {
  fs: fs,
  env: (json) => {
    fs.writeFileSync('database.json', json)
  },
  secretAuth: () => {
    const serviceAccount = require('./database.json')
    initializeApp({
      credential: cert(serviceAccount)
    })
    fs.writeFileSync('database.json', '')
    module.exports.db = getFirestore()
  },
  write: (file, contents) => {
    fs.writeFileSync(file, contents)
  },
  put: (collection, doc, input) => {
    if (typeof(collection) === 'string' && typeof(doc) === 'string' && typeof(input) === 'object') {
      module.exports.db.collection(collection).doc(doc).set(input)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    } else {
      console.log('Invalid parameters!\ncollection: string\ndoc: string\ninput: object')
      console.log(`You typed: ${typeof(collection), typeof(doc), typeof(input)}`)
    }
  },
  grab: (collection, doc) => {
    return module.exports.db.collection(collection).doc(doc).get()
  },
  use: (collection, doc, foo) => {
    return module.exports.db.collection(collection).doc(doc).get().then((item) => {
      foo(item)
    })
  }
}