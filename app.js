var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var eventosRouter = require('./routes/eventos');
var productosRouter = require('./routes/productos');
var serviciosRouter = require('./routes/servicios');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure:true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/', indexRouter);
app.use('/api/posts', postsRouter);
app.use('/api/eventos', eventosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/servicios', serviciosRouter);
app.use('/api/auth', authRouter);

app.use(function(req, res, next) {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
