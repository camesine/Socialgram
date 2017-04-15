var express = require("express");
var app = express();
var multer = require('multer');
var ext = require('file-extension');
var socialgram = require('socialgram-client')
var config = require('./config');
var client = platzigram.createClient(config.client)


var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads')
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + '.' + ext(file.originalname))
	}
});

var upload = multer({storage: storage}).single('picture');


app.set('view engine', 'pug');


app.use(express.static('public'));


app.get("/", function(req, res){
	res.render('index', { 'title' : 'SocialGram' });
});


app.get("/signup", function(req, res){
	res.render('index', { 'title' : 'SocialGram - Signup' });
});


app.get("/signin", function(req, res){
	res.render('index', { 'title' : 'SocialGram - Signin' });
});


app.get('/api/pictures', function (req, res, next) {
	client.listPictures(function (err, pictures) {
		if (err) return res.send([]);

		res.send(pictures);
	})
});


app.post('/api/pictures', ensureAuth, function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			return res.status(500).send(`Error uploading file: ${err.message}`);
		}

		var user = req.user
		var token = req.user.token;
		var username = req.user.username;
		var src = req.file.location

		client.savePicture({
			src: src,
			userId: username,
			user: {
				username: username,
				avatar: user.avatar,
				name: user.name
			}
		}, token, function (err, img) {
			if (err) {
			return res.status(500).send(err.message)
			}

			res.send(`File uploaded: ${req.file.location}`);
		})
	})
});


app.get('/api/user/:username', (req, res) => {
	var username = req.params.username;

	client.getUser(username, function (err, user) {
		if (err) return res.status(404).send({ error: 'user not found '})

		res.send(user);
	});
})


app.get('/:username', (req, res) => {
	res.render('index', {title: `Socialgram - ${req.params.username}`});
});


app.get('/:username/:id', (req, res) => {
	res.render('index', {title: `Socialgram - ${req.params.username}`});
});


app.listen(8000, function(err){
	if(err) return console.log(err), process.exit(1);

	console.log("SocialGram escuchando en el puerto 8000");
});
