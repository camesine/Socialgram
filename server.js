var express = require("express");
var app = express();
var multer = require('multer');
var ext = require('file-extension');

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

app.get('/api/pictures', function(req, res){

	var pictures = [{
	user:{
		username: 'Bob',
		avatar: 'office.jpg'
	},
	url: 'office.jpg',
	likes:'10',
	liked: false,
	creatAt: new Date()
},{
	user:{
		username: 'Bob',
		avatar: 'office.jpg'
	},
	url: 'office.jpg',
	likes:'10',
	liked: true,
	creatAt: new Date().setDate(new Date().getDate() - 10)
}];

setTimeout(function(){		
	res.send(pictures);
}, 2000);

});

app.post('/api/pictures', function(req, res){
	upload(req, res, (err) => {
		if(err){
			return res.send(500, 'Error uploading file');
		}else{
			res.send('File success');
		}
	})
})

app.get('/api/user/:username', (req, res) => {
	const user = {
		username: 'Bob',
		avatar : 'https://www.lastlevel.es/distribucion/images/prod/big/act117/mochila-cuadrada-bob-esponja-colegio-superventas.jpg',
		pictures: [
			{
				id: 1,
				src: 'https://www.lastlevel.es/distribucion/images/prod/big/act117/mochila-cuadrada-bob-esponja-colegio-superventas.jpg',
				likes: 3,

			},
			{
				id: 2,
				src: 'https://www.lastlevel.es/distribucion/images/prod/big/act117/mochila-cuadrada-bob-esponja-colegio-superventas.jpg',
				likes: 7,
				
			},
			{
				id: 3,
				src: 'https://www.lastlevel.es/distribucion/images/prod/big/act117/mochila-cuadrada-bob-esponja-colegio-superventas.jpg',
				likes: 9,
				
			},
			{
				id: 4,
				src: 'https://www.lastlevel.es/distribucion/images/prod/big/act117/mochila-cuadrada-bob-esponja-colegio-superventas.jpg',
				likes: 90,
				
			}
		]
	}
	res.send(user);
});

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