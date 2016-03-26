let express = require('express'),
    helmet = require('helmet'),
    path = require('path'),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    route = require('./routes/router'),
    log4js = require('./lib/log'),
    settings = require('./settings')
    
let app = express()
log4js.configure()
console.log(process.env.node_env)

// 模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// 日志输出
// app.use(logger('dev'));
app.use(log4js.useLog())

// favicon 图标
app.use(favicon(path.join(__dirname,'public/images','favicon.ico')))

//压缩中间件
app.use(compression())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//安全
app.use(helmet())

//静态资源路径
app.use(express.static(path.join(__dirname, 'public')))

//mongodb数据库设置
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000*60*60*24},
  store: new MongoStore({
    url: 'mongodb://localhost:'+settings.port+'/NodeV'
  })
}));

//路由设置
app.use(route);

/* 404 & 5xx */
app.use((req,res,next) => {
  res.status(404)
  if (req.accept('html')) {
    res.render('404',{
      url:req.url
    })
    return
  }
  req.accept('json') && res.send({err:'NOT FOUND'})
})

app.use((err,req,res,next) => {
  err.status = err.status || 500
  res.status(err.status)
  res.render('error',{
    message:error.status,
    error:err
  })
})

module.exports = app;
