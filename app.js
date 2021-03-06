var express = require( 'express' );
var bodyParser = require('body-parser')
var app = express();
var nunjucks = require('nunjucks');
var routes = require('./routes/');
var socketio = require('socket.io');

//var server = app.listen(3000);
var io = socketio.listen(server);

app.use('/', routes(io));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

var locals = {
	title: 'This is an example',
	people: [
		{name: 'Harry'},
		{name: 'Hermione'},
		{name: 'Ron'}
	]
};

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

// nunjucks.render('index.html', locals, function(err, output) {
// 	console.log(output);
// });

var server = app.listen(3000, function() {
  console.log('Server 3000 listening');
});

app.use(function(request, response, next) {
  console.log(request.method);
  console.log(request.url);
  //console.log(response.status);
  next();
});

app.get('/', function(request, response) {
  //response.send('Welcome to Twitter2.0');
  //response.render( 'index.html', {title: 'Hall of Fame', people: people} );
  response.render('index.html', locals);
});

var tweetRouter = express.Router();

app.use('/twitter', tweetRouter);

tweetRouter.get('/news', function (request, response, next) {
  response.send('Welcome to the news');
});
