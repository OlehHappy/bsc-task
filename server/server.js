var express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'), // use for GET, POST console logs
    bodyParser = require('body-parser');


// define middleware
app.use(bodyParser.json());
app.use(logger('dev'));

// Used for production build
app.use(express.static(path.join(__dirname, '../public')));

// routes
var postRoutes = require('routes');
app.use('/notes/', postRoutes);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});

// error hndlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});
