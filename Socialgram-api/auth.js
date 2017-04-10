'use strict'

const send = require('micro').send
const json = require('micro').json
const HttpHash = require('http-hash')
const Db = require('socialgram')
const config = require('./config')
const DbStub = require('./test/DbStub/db')
const utils = require('./lib/utils')
const hash = HttpHash()

const env = process.env.NODE_ENV || 'production'

let db = new Db(config.db)

if (env === 'test') {
	db = new DbStub()
}


hash.set('POST /', async function authenticate (req, res, params) {

	let credentials = await json(req)
	await db.connect()
	let auth = await db.authenticate(credentials.username, credentials.password)

	if (!auth) {
		return send(res, 401, { error: 'invalid credentials' })
	}

	let token = await utils.signToken({
		username: credentials.username
	}, config.secret)

	send(res, 200, token)
})


module.exports = async function main (req, res) {
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