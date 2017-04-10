'use strict'

const send = require('micro').send
const json = require('micro').json
const Db = require('socialgram')
const HttpHash = require('http-hash')
const hash = HttpHash()
const DbStub = require('./test/DbStub/db')
const config = require('./config')
const env = process.env.NODE_ENV || 'production'
const utils = require('./lib/utils')

let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

hash.set('GET /:id', async function getPicture (req, res, params) {
	let id = params.id
	await db.connect()
	let image = await db.getImage(id)
	await db.disconnect()
	send(res, 200, image)
})


hash.set('POST /', async function postPicture (req, res, params) {
	let image = await json(req)

	try {
		let token = await utils.extractToken(req)
		let encoded = await utils.verifyToken(token, config.secret)

		if (encoded && encoded.userId !== image.userId) {
		  throw new Error('invalid token')
		}

	} catch (e) {
		return send(res, 401, { error: 'invalid token' })
	}

	await db.connect()
	let created = await db.saveImage(image)
	await db.disconnect()
	send(res, 201, created)
})



hash.set('POST /:id/like', async function likePicture (req, res, params) {
	let id = params.id
	await db.connect
	let image = await db.likePicture(id)
	await db.disconnect()
	send(res, 200, image)
})


hash.set('GET /list', async function list (req, res, params) {
	await db.connect()
	let images = await db.getImages()
	await db.disconnect()
	send(res, 200, images)
})


hash.set('GET /tag/:tag', async function getPicture (req, res, params) {
	let tag = params.tag
	await db.connect()
	let images = await db.getImagesByTag(tag)
	await db.disconnect()
	send(res, 200, images)
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





