var express = require( 'express' );
var app = express();

app.listen(3000, function() {
  console.log('Server 3000 listening');
});

app.get('/', function(request, response) {
  response.send('Welcome to Twitter2.0');
});

app.use(function(request, response, next) {
  console.log(request.method);
  console.log(request.url);
  next();
});

var tweetRouter = express.Router();

app.use('/twitter', tweetRouter);

tweetRouter.get('/news', function (request, response, next) {
  response.send('Welcome to the news');
});
