var page = require('page');
var empty = require('empty-element');
var template = require("./template");
var title = require('title');

page('/', function(ctx, next) {

	title("SocialGram");
	var main = document.getElementById('main-container');

	var pictures = [{
		user:{
			username: 'camello',
			avatar: 'office.jpg'
		},
		url: 'office.jpg',
		likes:'10',
		liked:'true'
	},{
		user:{
			username: 'camello',
			avatar: 'office.jpg'
		},
		url: 'office.jpg',
		likes:'10',
		liked:'true'
	}];


	empty(main).appendChild(template(pictures));

});