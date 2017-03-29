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

