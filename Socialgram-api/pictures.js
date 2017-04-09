'use strict'

const send = require('micro').send
const Db = require('socialgram')
const HttpHash = require('http-hash')
const hash = HttpHash()
const DbStub = require('./test/DbStub/db')
const config = require('./config')
const env = process.env.NODE_ENV || 'production'

let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

hash.set('GET /:id', async function getPicture (req, res, params) {
	// send(res, 200, params)
	let id = params.id
	await db.connect()
	let image = await db.getImage(id)
	
	await db.disconnect()
	send(res, 200, image)
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




