var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Photo = mongoose.model('Photo');
var multer = require('multer');

module.exports = function (app) {
  app.use('/photos', multer({ dest: '../../public' }), router);
};

router.get('/', function (req, res, next) {
  Photo.find(function (err, photos) {
    if (err) {
      return res.send(err);
    }
    res.json({
      photos: photos
    });
  });
});

router.get('/:id', function(req, res, next) {
  Photo.findById(req.params.id, function(err, photo) {
    if (err) {
      return res.send(err);
    }
    res.json({
      photo: photo
    });
  });
});

router.post('/', function(req, res, next) {
  var photo = new Photo();
  var p = req.body.photo;
  for (var key in p) {
    photo[key] = p[key];
  }
  photo.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.json({
      photo: photo
    });
  });
});

router.put('/:id', function(req, res, next) {
  Photo.findById(req.params.id, function(err, photo) {
    if (err) {
      return res.send(err);
    }
    var p = req.body.entry;
    for (var key in p) {
      photo[key] = p[key];
    }
    photo.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.json({
        photo: photo
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Photo.remove({
    _id: req.params.id
  }, function(err, photo) {
    if (err) {
      return res.send(err);
    }
    res.json({});
  });
});

