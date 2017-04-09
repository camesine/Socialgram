
'use strict'

const send = require('micro').send
const json = require('micro').json
const HttpHash = require('http-hash')
const Db = require('socialgram')
const config = require('./config')
const DbStub = require('./test/DbStub/db')
const gravatar = require('gravatar')

const env = process.env.NODE_ENV || 'production'

let db = new Db(config.db)

if (env === 'test') {
    db = new DbStub()
}

const hash = HttpHash()

hash.set('POST /', async function saveUser (req, res, params) {
    let user = await json(req)
    await db.connect()
    let created = await db.saveUser(user)
    await db.disconnect()

    delete created.email
    delete created.password

    send(res, 201, created)
})


hash.set('GET /:username', async function getUser (req, res, params) {
    let username = params.username
    await db.connect()
    let user = await db.getUser(username)

    delete user.email
    delete user.password

    send(res, 200, user)
})


module.exports =  async function main (req, res) {
    
    let { method, url } = req
    let match = hash.get(`${method.toUpperCase()} ${url}`)

    if (match.handler) {
        try {
            await match.handler(req, res, match.params)
        } catch (e) {
            send(res, 500, { error: e.message })
        }
    } else {
        send(res, 404, { error: 'route not found' })
    }
}