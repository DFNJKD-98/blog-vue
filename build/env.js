/**
 * Created by BM on 09/03/2017.
 */

const fs = require('fs')
const f = require('util').format
const path = require('path')

const user = encodeURIComponent('blog')
const password = encodeURIComponent('blog:test')
const authMechanism = 'DEFAULT'

// big-mac admin auth [admin, maicss+1s]

const SITE_NAME = 'https://maicss.com/'
const MD_DIR = path.resolve(__dirname, './frontEnd/MD/')
const MD_OUTPUT_DIR = path.resolve(__dirname, './frontEnd/archives/')

let url = f('mongodb://%s:%s@localhost:27017/blog-test',
  user, password)

let loggerConfig = {
  db: 'mongodb://127.0.0.1:27017/blog-test',
  collection: 'logger',
  username: user,
  password: 'blog:test'
}

let testConfig = {
  ssl: {
    keyFile: '/Users/mac/Documents/ssl/server.key',
    certFile: '/Users/mac/Documents/ssl/server.crt',
    chainFile: '/Users/mac/Documents/ssl/full_chained.crt',
    ca: '/Users/mac/Documents/ssl/root.crt'
  },
  port: {
    secure: 9981,
    'non-secure': 9980
  }
}

let env
let credentials = {}
env = testConfig
credentials.ca = fs.readFileSync(env.ssl.ca)

module.exports = {
  credentials: Object.assign(credentials, {
    cert: fs.readFileSync(env.ssl.certFile),
    key: fs.readFileSync(env.ssl.keyFile),
    chain: fs.readFileSync(env.ssl.chainFile),
    requestCert: false,
    rejectUnauthorized: false
  }),
  ports: env.port,
  mongoConfig: {
    url, loggerConfig
  },
  SITE_NAME, MD_DIR, MD_OUTPUT_DIR
}
