var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('config');
var debug = require('debug')('server');

var api = require('./api');
var __DEV__ = process.env.NODE_ENV === 'development';

var app = express();

if (__DEV__) {
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/api', api);

app.use(express.static(__DEV__ ? 'app' : 'dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, __DEV__ ? 'app' : 'dist', 'index.html'));
});

app.listen(config.port, '0.0.0.0', function (err) {
  if (err) {
    debug(err);
    return;
  }
  debug('Listening at http://0.0.0.0:' + config.port);
});
