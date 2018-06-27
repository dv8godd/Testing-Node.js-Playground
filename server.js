const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // use Heroku port or default to 3000

let app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n', (err) => {
		if (err) {
			console.log('Unable to append to the server.');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'welcome to the website'
	});
});

app.get('/json',(req, res) => {
	// res.send('<h1>hello express!</h1>');
	res.send({
		name: 'Radd',
		likes: [
			'videogames',
			'music'
		]
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/index.php?', (req, res) => {
	res.send('I\'m not a real PHP page. I\'m Node.js');
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to fullfill this request.'
	});
});

app.listen(port, () => {
	console.log('server is up on port '+port);
});