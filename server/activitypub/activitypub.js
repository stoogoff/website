
const express = require('express')
const bodyParser = require('body-parser')
const me = require('./me')
const webfinger = require('./webfinger')
const outbox = require('./outbox')
const inbox = require('./inbox')

const app = express()

app.use(bodyParser.json())


app.get('/me', me)
app.get('/me/outbox', outbox.get)
app.post('/me/inbox', inbox.post)
app.get('/.well-known/webfinger', webfinger)

module.exports = app
