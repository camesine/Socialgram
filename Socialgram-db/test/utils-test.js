'use strict'

const test = require('ava')

const utils = require('../lib/utils');

test('extracting hashtag from text', t => {
	let tags = utils.extractTags('a #picture with tags #Awesome #Socialgram ##Nice');

	t.deepEqual(tags,[
		'picture',
		'awesome',
		'socialgram',
		'nice'
	])

	tags = utils.extractTags('a picture with no tags')
	t.deepEqual(tags, [])

	tags = utils.extractTags();
	t.deepEqual(tags, []);	

	tags = utils.extractTags(null);
	t.deepEqual(tags, []);	

});


test('encrypt password', t => {

	let password = 'foo123'
	let encrypted = '02b353bf5358995bc7d193ed1ce9c2eaec2b694b21d2f96232c9d6a0832121d1'

	let result = utils.encrypt(password)

	t.is(result, encrypted)

})