var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
  app.use('/work', router);
  app.use('/about', router);
  app.use('/contact', router);
};

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/work', function (req, res, next) {
  res.render('work');
});

router.get('/about', function (req, res, next) {
  res.render('about');
});

router.get('/contact', function (req, res, next) {
  res.render('contact');
});
