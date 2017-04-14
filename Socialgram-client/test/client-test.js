const test = require('ava')
const socialgram = require('../')
const fixtures = require('./fixtures')


test('client', t => {
	const client = socialgram.createClient()

	t.is(typeof client.getPicture, 'function')
	t.is(typeof client.savePicture, 'function')
	t.is(typeof client.likePicture, 'function')
	t.is(typeof client.listPictures, 'function')
	t.is(typeof client.getPicturesByTag, 'function')
	t.is(typeof client.saveUser, 'function')
	t.is(typeof client.getUser, 'function')
	t.is(typeof client.auth, 'function')
})