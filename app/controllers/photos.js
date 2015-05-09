var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Photo = mongoose.model('Photo');
var multer = require('multer');
var async = require('async');

module.exports = function (app) {
  app.use('/photos', router);
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

router.post('/', multer({ dest: './public/uploads' }), function(req, res, next) {
  var keys = Object.keys(req.files);
  var photos = [];
  keys.forEach(function(key) {
    var p = req.files[key];
    var photo = new Photo();
    photo.title = p.originalname;
    photo.imgPath = [req.protocol,
                    '://',
                    req.headers.host,
                    '/',
                    p.path.split('/').splice(1).join('/')].join('');
    photos.push(function(callback) {
      photo.save().then(function(photo) {
        callback(null, photo);
      }, function(err) {
        callback(err);
      });
    });
  });

  async.parallel(photos, function(err, results) {
    if (err) {
      return res.send(err);
    }
    res.json({
      photos: results
    });
  });
});

router.put('/:id', function(req, res, next) {
  Photo.findById(req.params.id, function(err, photo) {
    if (err) {
      return res.send(err);
    }
    var p = req.body.photo;
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

