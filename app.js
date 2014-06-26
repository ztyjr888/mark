
/**
 * Module dependencies
 */

//var mongodb = require("mongodb");
//var server = new mongodb.Server('localhost',27017,{auto_reconnect:true},10);
//var db = new mongodb.Db("mydb2",server,{safe:true});

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'), 
  //MongoStore = require('connect-mongo')(express),
  //settings = require('./settings'),
  flash=require('connect-flash');//页面的通知和错误信息显示

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(flash());//页面的通知和错误信息显示
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
// app.use(express.session({
//   secret: settings.cookieSecret,
//   key: settings.db,
//   cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
//   store: new MongoStore({
//     db: settings.db
//   })

// }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/books/booklist', api.booklist);
app.get('/books/:id', api.singleBook);
app.post('/books', api.addMark);
app.delete('/books/:id', api.removeMark);
app.post('/api/addMark', api.addMark);

app.post('/api/reg', api.reg);

//检查是否已登陆
//app.get('/user/login', api.checkNotLogin);
//登陆
app.post('/api/login', api.login);
//登出
app.get('/user/logout', api.logout);

//网络爬虫
app.post('/api/baike', api.baike);
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
