var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/*', function (req, res, next) {
  res.render('admin', { layout: false });
});
