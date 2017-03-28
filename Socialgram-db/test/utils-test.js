'use strict'

const test = require('ava')


test('This should pass', t => {
	t.pass()
})


test('This should fail', t => {
	t.fail()
})

test('It should support async/await', async t => {
	let p = Promise.resolve(42)
	let secret = await p
	t.is(secret, 42)
})
