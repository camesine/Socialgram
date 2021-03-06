var page = require('page');
var empty = require('empty-element');
var template = require("./template");
var title = require('title');
var header = require('../header');

page('/', header, loading ,loadPictures, function(ctx, next) {

	title("SocialGram");
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.pictures));

});

function loading(ctx, next){
	var el = document.createElement('div');
	el.classList.add('loader');
	document.getElementById('main-container').appendChild(el);
	next();
}

async function loadPictures(ctx, next){
	try{
		ctx.pictures = await fetch('/api/pictures').then(res => res.json());
		next();
	}catch(err){
		return console.log(err);
	}
}