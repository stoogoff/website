
const express = require('express')
const bodyParser = require('body-parser')
const me = require('./me')
const webfinger = require('./webfinger')

const app = express()

app.use(bodyParser.json())


app.get('/me', me)
app.get('/.well-known/webfinger', webfinger)

module.exports = app
