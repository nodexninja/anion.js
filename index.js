const db = require('./database')
const express = require('express')
const Mustache = require('mustache')
const extra = require('fs-extra')
const fs = db.fs

const app = express()

module.exports = {
  db: db,
  server: app,
  express: express,
  render: (html, config, data) => {
    const file = fs.readFileSync(html, 'utf8')
    const rendered = Mustache.render(file, data)
    if (!fs.existsSync('anion')) {
      fs.mkdirSync('anion')
    } else {
      extra.emptyDirSync('anion')
    }
    const list = html.split('/')
    const page = list[list.length - 1]
    const path = html.replace(page, '')
    fs.writeFileSync(`anion/${page}`, rendered)
    let css = {
      files: [],
    }
    let js = {
      files: [],
    }
    if (typeof config === 'object') {
      if (typeof config.css === 'string') {
        if (config.css === '*') {
          css.files = fs.readdirSync(`${path}`).filter(file => file.endsWith('.css'))
        } else {
          css.files = fs.readdirSync(`${path}${config.css}`).filter(file => file.endsWith('.css'))
        }
        if (!fs.existsSync(`anion/${config.css}`)) {
          fs.mkdirSync(`anion/${config.css}/`)
        }
        for (css of css.files) {
          const styling = fs.readFileSync(`${path}${config.css}/${css}`)
          fs.writeFileSync(`anion/${config.css}/${css}`, styling)
        }
      } else {
        console.log('Invalid CSS config. CSS config must be a string!')
      }
      if (typeof config.js === 'string') {
        if (config.js === '*') {
          js.files = fs.readdirSync(`${path}`).filter(file => file.endsWith('.js'))
        } else {
          js.files = fs.readdirSync(`${path}${config.js}`).filter(file => file.endsWith('.js'))
        }
        if (!fs.existsSync(`anion/${config.js}`)) {
          fs.mkdirSync(`anion/${config.js}/`)
        }
        for (js of js.files) {
          const script = fs.readFileSync(`${path}${config.js}/${js}`)
          fs.writeFileSync(`anion/${config.js}/${js}`, script)
        }
      } else {
        console.log('Invalid JS config. JS config must be a string!')
      }
    } else {
      throw 'The path config parameter must be an object!'
    }
    return rendered
  }
}