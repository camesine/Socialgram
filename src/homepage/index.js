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
		liked: false,
		creatAt: new Date()
	},{
		user:{
			username: 'camello',
			avatar: 'office.jpg'
		},
		url: 'office.jpg',
		likes:'10',
		liked: true,
		creatAt: new Date().setDate(new Date().getDate() - 10)
	}];


	empty(main).appendChild(template(pictures));

});