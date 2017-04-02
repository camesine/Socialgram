'use strict'

const r = require('rethinkdb')
const co = require('co')
const Promise = require('bluebird')

const defaults = {
	host: 'localhost',
	port: 28015,
	db: 'socialgram'
}

class Db{

	constructor(options){
		options = options || {}
		this.host = options.host || defaults.host
		this.port = options.port || defaults.port
		this.db = options.db || defaults.db
	}

	connect(callback){
		this.connection = r.connect({
			host: this.host,
			port: this.port
		})

		let db = this.db
		let connection = this.connection

		let setup = co.wrap(function * (){
			let conn = yield connection
			
			console.log("paso1")
			let dbList = yield r.dbList().run(conn)
			if(dbList.indexOf(db) === -1)
				yield r.dbCreate(db).run(conn)

			console.log("paso2")

			let dbTables = yield r.db(db).tableList().run(conn)
			if(dbTables.indexOf('images') === -1)
				yield r.db(db).tableCreate('images').run(conn)
			
			console.log("paso3")

			if(dbTables.indexOf('users') === -1)
				yield r.db(db).tableCreate('users').run(conn)

			console.log("paso4")
			return conn

		})

		console.log("paso5")
		return Promise.resolve(setup()).asCallback(callback)

	}
}


module.exports = Db